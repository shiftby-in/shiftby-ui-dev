// Client/server-safe API utilities using our shared Supabase client wrappers
import { supabase } from '../../src/lib/supabase-client'

export type Course = {
  id: number | string
  title: string
  summary?: string | null
  level?: string | null
  price_usd?: number | null
  cover_url?: string | null
}

// Server-side: query via service client (no proxy)
export async function fetchCoursesServer(): Promise<Course[]> {
  const { getSupabaseAdmin } = await import('../../src/lib/supabase-server')
  const supabaseAdmin = getSupabaseAdmin()
  if (!supabaseAdmin) {
    console.error('Supabase admin not configured; returning empty courses list.')
    return []
  }
  const baseSelect = 'id,title,summary,level,price_usd,cover_url'
  const { data, error } = await supabaseAdmin
    .from('courses')
    .select(baseSelect)
    .eq('published', true)
    .order('id', { ascending: true })
  if (error) {
    const code = (error as any)?.code || ''
    const msg = (error as any)?.message?.toLowerCase?.() || ''
    if (code === '42P01' || (msg.includes('relation') && msg.includes('does not exist'))) {
      return []
    }
    if (msg.includes('column') && msg.includes('published')) {
      const { data: data2, error: error2 } = await supabaseAdmin
        .from('courses')
        .select(baseSelect)
        .order('id', { ascending: true })
      if (error2) throw new Error(error2.message || 'Failed to load courses')
      return data2 ?? []
    }
    throw new Error((error as any)?.message || 'Failed to load courses')
  }
  return data ?? []
}

// Client-side: call our Next.js API which uses the service client
export async function fetchCoursesClient(): Promise<Course[]> {
  const res = await fetch(`/api/courses`, { cache: 'no-store' } as RequestInit)
  if (!res.ok) {
    const body = await res.json().catch(() => ({} as any))
    throw new Error(body?.message || `Courses API failed: ${res.status}`)
  }
  const data = (await res.json()) as Course[]
  return Array.isArray(data) ? data : []
}

// Convenience: pick server vs client automatically
export async function fetchCourses(): Promise<Course[]> {
  const isServer = typeof window === 'undefined'
  return isServer ? fetchCoursesServer() : fetchCoursesClient()
}

export type RegisterPayload = {
  first_name: string
  last_name: string
  email: string
  mobile: string
  course_id: string
}

export async function registerUser(payload: RegisterPayload): Promise<{ success: true }> {
  const res = await fetch(`/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  } as RequestInit)
  if (!res.ok) {
    const body = await res.json().catch(() => ({} as any))
    throw new Error(body?.message || 'Registration failed')
  }
  return { success: true }
}
