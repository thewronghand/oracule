import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { secureCookieOptions } from './cookies'

export const supabase = createPagesBrowserClient({
  cookieOptions: secureCookieOptions,
})
