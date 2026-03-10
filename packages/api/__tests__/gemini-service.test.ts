import { describe, it, expect } from 'vitest'
import { generateTarotReading } from '../src/services/gemini.service'

describe('generateTarotReading', () => {
  it('is exported as a function', () => {
    expect(typeof generateTarotReading).toBe('function')
  })

  it('returns a Promise', () => {
    // Call with invalid config to get a synchronous throw before any async work,
    // or verify the return type is a Promise when called normally.
    const result = generateTarotReading(
      { serviceAccountJson: '{"project_id":"p","private_key":"k","client_email":"e@e.com"}' },
      'system input',
      'system response',
      'user prompt'
    )
    expect(result).toBeInstanceOf(Promise)
    // Prevent unhandled rejection — the call will fail due to invalid private key
    result.catch(() => undefined)
  })
})

describe('parseServiceAccount (via generateTarotReading input validation)', () => {
  it('throws Korean error when serviceAccountJson is not valid JSON', async () => {
    await expect(
      generateTarotReading(
        { serviceAccountJson: 'not-valid-json' },
        'system input',
        'system response',
        'user prompt'
      )
    ).rejects.toThrow('서비스 계정 JSON 파싱 실패: 올바른 JSON 형식이 아닙니다')
  })

  it('throws Korean error when serviceAccountJson is missing required fields', async () => {
    await expect(
      generateTarotReading(
        { serviceAccountJson: '{"project_id":"only-project"}' },
        'system input',
        'system response',
        'user prompt'
      )
    ).rejects.toThrow(
      '서비스 계정 JSON에 필수 필드가 없습니다 (project_id, private_key, client_email)'
    )
  })

  it('throws Korean error when serviceAccountJson is valid JSON but not an object', async () => {
    await expect(
      generateTarotReading(
        { serviceAccountJson: '"just-a-string"' },
        'system input',
        'system response',
        'user prompt'
      )
    ).rejects.toThrow(
      '서비스 계정 JSON에 필수 필드가 없습니다 (project_id, private_key, client_email)'
    )
  })

  it('throws Korean error when serviceAccountJson fields have wrong types', async () => {
    await expect(
      generateTarotReading(
        { serviceAccountJson: '{"project_id":123,"private_key":"key","client_email":"e@e.com"}' },
        'system input',
        'system response',
        'user prompt'
      )
    ).rejects.toThrow('서비스 계정 JSON 필드 타입이 올바르지 않습니다')
  })

  it('throws Korean error when serviceAccountJson is null JSON', async () => {
    await expect(
      generateTarotReading(
        { serviceAccountJson: 'null' },
        'system input',
        'system response',
        'user prompt'
      )
    ).rejects.toThrow(
      '서비스 계정 JSON에 필수 필드가 없습니다 (project_id, private_key, client_email)'
    )
  })

  it('accepts valid serviceAccountJson and proceeds past parsing (fails later on network/crypto)', async () => {
    const validJson = JSON.stringify({
      project_id: 'my-project',
      private_key: 'invalid-pem-but-passes-parsing',
      client_email: 'service@project.iam.gserviceaccount.com',
    })
    // Should NOT throw the JSON parsing error — it will fail later on crypto/network
    await expect(
      generateTarotReading(
        { serviceAccountJson: validJson },
        'system input',
        'system response',
        'user prompt'
      )
    ).rejects.not.toThrow('서비스 계정 JSON 파싱 실패: 올바른 JSON 형식이 아닙니다')
  })
})
