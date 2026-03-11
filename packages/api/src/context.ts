import { type inferAsyncReturnType } from '@trpc/server'
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { createRemoteJWKSet, jwtVerify } from 'jose'
import { DrizzleD1Database } from 'drizzle-orm/d1'
import { createDb } from './db/client'

interface User {
  id: string
}

interface ApiContextProps {
  user: User | null
  db: DrizzleD1Database
  vertexServiceAccountJson: string
}

// JWKS 캐시
let cachedJWKS: ReturnType<typeof createRemoteJWKSet> | null = null

function getJWKS(supabaseUrl: string) {
  if (!cachedJWKS) {
    cachedJWKS = createRemoteJWKSet(new URL(`${supabaseUrl}/auth/v1/jwks`))
  }
  return cachedJWKS
}

export const createContext = async (
  d1: D1Database,
  JWT_VERIFICATION_KEY: string,
  vertexServiceAccountJson: string,
  opts: FetchCreateContextFnOptions,
  supabaseUrl?: string
): Promise<ApiContextProps> => {
  const db = createDb(d1)

  async function getUser() {
    const authHeader = opts.req.headers.get('authorization')
    const sessionToken = authHeader?.split(' ')[1]

    if (!sessionToken || sessionToken === 'undefined') return null

    try {
      if (supabaseUrl) {
        // JWKS 기반 검증 (ES256 등 자동 지원)
        const jwks = getJWKS(supabaseUrl)
        const { payload } = await jwtVerify(sessionToken, jwks)

        if (payload.sub) {
          return { id: payload.sub }
        }
      }
    } catch (e) {
      console.error('[auth] JWT 검증 실패:', e)
    }

    return null
  }

  const user = await getUser()

  return { user, db, vertexServiceAccountJson }
}

export type Context = inferAsyncReturnType<typeof createContext>
