import { createClient } from '@supabase/supabase-js'
import { config } from '../config'

const supabaseUrl = config.supabaseUrl
const supabaseAnonKey = config.supabaseAnonKey

const isValidUrl = (url) => {
  try {
    return url.startsWith('http://') || url.startsWith('https://')
  } catch {
    return false
  }
}

export const supabase =
  isValidUrl(supabaseUrl) && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export const hasSupabase = Boolean(supabase)