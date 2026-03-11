import { DEFAULT_COOKIE_OPTIONS } from '@supabase/auth-helpers-shared'

export function getCookieValue(cookieName: string): string | undefined {
  const cookieString = document.cookie
  const cookieNameLength = cookieName.length
  const cookies = cookieString.split(';')

  for (let i = 0, len = cookies.length; i < len; i++) {
    let cookie = cookies[i]
    if (cookie?.length === 0) continue

    while (cookie?.charAt(0) === ' ') {
      cookie = cookie.substring(1)
    }

    if (cookie?.indexOf(cookieName) === 0) {
      const cookieValue = cookie.replace('-code-verifier', '').substring(cookieNameLength + 1)
      return decodeURIComponent(cookieValue)
    }
  }

  return undefined
}

export const AUTH_TOKEN_COOKIE_NAME = 'auth-token'

const isProduction = typeof window !== 'undefined' && window.location.protocol === 'https:'

export const secureCookieOptions = {
  ...DEFAULT_COOKIE_OPTIONS,
  name: AUTH_TOKEN_COOKIE_NAME,
  sameSite: 'Lax' as const,
  secure: isProduction,
}

export const getToken = (): string | undefined => {
  let token = getCookieValue(AUTH_TOKEN_COOKIE_NAME)
  if (token !== undefined) {
    const parse = JSON.parse(token)
    if (Array.isArray(parse) && parse.length > 0) {
      token = parse[0]
    }
  }
  return token
}
