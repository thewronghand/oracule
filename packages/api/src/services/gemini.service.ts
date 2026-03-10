// Vertex AI Gemini REST API 서비스
// Cloudflare Workers 환경에서 Web Crypto API를 사용한 JWT 인증

const DEFAULT_REGION = 'us-central1'
const DEFAULT_MODEL = 'gemini-2.0-flash'
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token'
const SCOPE = 'https://www.googleapis.com/auth/cloud-platform'

interface GeminiServiceConfig {
  serviceAccountJson: string
  region?: string
  model?: string
}

interface ServiceAccountKey {
  project_id: string
  private_key: string
  client_email: string
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>
      role?: string
    }
  }>
  error?: {
    code: number
    message: string
    status: string
  }
}

interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

// 모듈 레벨 토큰 캐시 (같은 요청 내 재사용)
let cachedToken: { token: string; expiresAt: number } | null = null

function base64UrlEncode(data: ArrayBuffer | Uint8Array): string {
  const bytes = data instanceof ArrayBuffer ? new Uint8Array(data) : data
  let binary = ''
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlEncodeString(str: string): string {
  const encoder = new TextEncoder()
  return base64UrlEncode(encoder.encode(str))
}

function pemToDer(pem: string): ArrayBuffer {
  const pemContents = pem
    .replace(/-----BEGIN [A-Z ]+-----/g, '')
    .replace(/-----END [A-Z ]+-----/g, '')
    .replace(/\s/g, '')

  const binaryString = atob(pemContents)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}

function parseServiceAccount(jsonString: string): ServiceAccountKey {
  try {
    const parsed: unknown = JSON.parse(jsonString)
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('project_id' in parsed) ||
      !('private_key' in parsed) ||
      !('client_email' in parsed)
    ) {
      throw new Error(
        '서비스 계정 JSON에 필수 필드가 없습니다 (project_id, private_key, client_email)'
      )
    }
    const sa = parsed as Record<string, unknown>
    if (
      typeof sa.project_id !== 'string' ||
      typeof sa.private_key !== 'string' ||
      typeof sa.client_email !== 'string'
    ) {
      throw new Error('서비스 계정 JSON 필드 타입이 올바르지 않습니다')
    }
    return {
      project_id: sa.project_id,
      private_key: sa.private_key,
      client_email: sa.client_email,
    }
  } catch (e) {
    if (e instanceof SyntaxError) {
      throw new Error('서비스 계정 JSON 파싱 실패: 올바른 JSON 형식이 아닙니다')
    }
    throw e
  }
}

async function createJwt(clientEmail: string, privateKeyPem: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  const header = { alg: 'RS256', typ: 'JWT' }
  const payload = {
    iss: clientEmail,
    sub: clientEmail,
    aud: TOKEN_ENDPOINT,
    iat: now,
    exp: now + 3600,
    scope: SCOPE,
  }

  const encodedHeader = base64UrlEncodeString(JSON.stringify(header))
  const encodedPayload = base64UrlEncodeString(JSON.stringify(payload))
  const signingInput = `${encodedHeader}.${encodedPayload}`

  const derKey = pemToDer(privateKeyPem)

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    derKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const encoder = new TextEncoder()
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    encoder.encode(signingInput)
  )

  const encodedSignature = base64UrlEncode(signature)
  return `${signingInput}.${encodedSignature}`
}

async function getAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  // 캐시된 토큰이 유효하면 재사용 (만료 5분 전에 갱신)
  const now = Math.floor(Date.now() / 1000)
  if (cachedToken && cachedToken.expiresAt > now + 300) {
    return cachedToken.token
  }

  const jwtToken = await createJwt(clientEmail, privateKey)

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwtToken}`,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Google OAuth2 토큰 교환 실패 (${response.status}): ${errorText}`)
  }

  const tokenData = (await response.json()) as TokenResponse

  if (!tokenData.access_token) {
    throw new Error('토큰 응답에 access_token이 없습니다')
  }

  // 토큰 캐싱
  cachedToken = {
    token: tokenData.access_token,
    expiresAt: now + tokenData.expires_in,
  }

  return tokenData.access_token
}

interface ReadingInterpretation {
  cardReadings: Array<{
    cardName: string
    position: string
    interpretation: string
  }>
  content: string
  title: string
  summary: string
}

function parseReadingResponse(text: string): ReadingInterpretation {
  // ```json 코드블록 제거
  let cleaned = text.trim()
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, '').replace(/```\s*$/, '')
  }

  try {
    const parsed: unknown = JSON.parse(cleaned)
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'content' in parsed &&
      'cardReadings' in parsed
    ) {
      const obj = parsed as Record<string, unknown>
      return {
        cardReadings: Array.isArray(obj.cardReadings) ? obj.cardReadings as ReadingInterpretation['cardReadings'] : [],
        content: typeof obj.content === 'string' ? obj.content : '',
        title: typeof obj.title === 'string' ? obj.title : '타로 리딩 결과',
        summary: typeof obj.summary === 'string' ? obj.summary : '',
      }
    }
  } catch {
    // JSON 파싱 실패 — fallback
  }

  return {
    title: '타로 리딩 결과',
    summary: '',
    cardReadings: [],
    content: text,
  }
}

export async function generateTarotReading(
  config: GeminiServiceConfig,
  systemInput: string,
  systemResponse: string,
  userPrompt: string
): Promise<ReadingInterpretation> {
  const serviceAccount = parseServiceAccount(config.serviceAccountJson)
  const region = config.region ?? DEFAULT_REGION
  const model = config.model ?? DEFAULT_MODEL

  // 1. 액세스 토큰 획득
  const accessToken = await getAccessToken(serviceAccount.client_email, serviceAccount.private_key)

  // 2. Vertex AI REST API 호출
  const endpoint = `https://${region}-aiplatform.googleapis.com/v1/projects/${serviceAccount.project_id}/locations/${region}/publishers/google/models/${model}:generateContent`

  const requestBody = {
    contents: [
      { role: 'user', parts: [{ text: systemInput }] },
      { role: 'model', parts: [{ text: systemResponse }] },
      { role: 'user', parts: [{ text: userPrompt }] },
    ],
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 4096,
    },
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Gemini API 호출 실패 (${response.status}): ${errorText}`)
  }

  const data = (await response.json()) as GeminiResponse

  if (data.error) {
    throw new Error(`Gemini API 에러: [${data.error.code}] ${data.error.message}`)
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) {
    throw new Error('Gemini API 응답에서 텍스트를 추출할 수 없습니다')
  }

  return parseReadingResponse(text)
}
