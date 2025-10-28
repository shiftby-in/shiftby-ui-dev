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

export async function fetchCourses(): Promise<Course[]> {
  const baseSelect = 'id,title,summary,level,price_usd,cover_url'
  console.log('Fetching courses from Supabase API...')
  const { data, error } = await supabase
    .from('courses')
    .select(baseSelect)
    .eq('published', true)
    .order('id', { ascending: true })
  console.log('Supabase fetchCourses response:', { data, error })
  if (error) {
    const msg = (error as any)?.message?.toLowerCase?.() || ''
    if (msg.includes('column') && msg.includes('published')) {
      const { data: data2, error: error2 } = await supabase
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

export type RegisterPayload = {
  first_name: string
  last_name: string
  email: string
  mobile: string
  course_id: number
}

export async function registerUser(payload: RegisterPayload): Promise<{ success: true }> {
  const { error } = await supabase.from('registrations').insert([payload])
  if (error) {
    throw new Error(error.message || 'Registration failed')
  }
  return { success: true }
}
