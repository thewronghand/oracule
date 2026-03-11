import { type inferAsyncReturnType } from '@trpc/server'
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { importJWK, jwtVerify, type JWK } from 'jose'
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

// JWKS 캐시 (1시간)
let cachedKey: { key: CryptoKey; expiry: number } | null = null

async function getSigningKey(supabaseUrl: string, supabaseAnonKey: string): Promise<CryptoKey> {
  if (cachedKey && Date.now() < cachedKey.expiry) {
    return cachedKey.key
  }

  const res = await fetch(`${supabaseUrl}/auth/v1/.well-known/jwks.json`, {
    headers: { apikey: supabaseAnonKey },
  })

  if (!res.ok) {
    throw new Error(`JWKS fetch failed: ${res.status}`)
  }

  const { keys } = (await res.json()) as { keys: JWK[] }
  const jwk = keys[0]
  if (!jwk) throw new Error('No keys in JWKS')

  const key = await importJWK(jwk, jwk.alg ?? 'ES256')
  cachedKey = { key: key as CryptoKey, expiry: Date.now() + 60 * 60 * 1000 }
  return key as CryptoKey
}

export const createContext = async (
  d1: D1Database,
  JWT_VERIFICATION_KEY: string,
  vertexServiceAccountJson: string,
  opts: FetchCreateContextFnOptions,
  supabaseUrl?: string,
  supabaseAnonKey?: string
): Promise<ApiContextProps> => {
  const db = createDb(d1)

  async function getUser() {
    const authHeader = opts.req.headers.get('authorization')
    const sessionToken = authHeader?.split(' ')[1]

    if (!sessionToken || sessionToken === 'undefined') return null

    try {
      if (supabaseUrl && supabaseAnonKey) {
        const key = await getSigningKey(supabaseUrl, supabaseAnonKey)
        const { payload } = await jwtVerify(sessionToken, key)

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
