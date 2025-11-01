import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../src/lib/supabase-server'
import { createClient } from '@supabase/supabase-js'

export type APICourse = {
  id: number | string
  title: string
  summary?: string | null
  level?: string | null
  price_usd?: number | null
  cover_url?: string | null
}

export async function getPublishedCourses(): Promise<APICourse[]> {
  const supabase = supabaseAdmin

  // Try with published=true, then gracefully fall back if column is missing
  const baseSelect = 'id,title,summary,level,price_usd,cover_url'
  const { data, error } = await supabase
    .from('courses')
    .select(baseSelect)
    .eq('published', true)
    .order('id', { ascending: true })
  console.log("Fetched courses from Supabase from API2:", data);
  if (error) {
    // Return empty if table is missing to avoid hard-failing the page
    const code = (error as any)?.code || ''
    const msg = (error as any)?.message?.toLowerCase?.() || ''
    if (code === '42P01' || (msg.includes('relation') && msg.includes('does not exist'))) {
      console.warn('courses table missing99; returning empty list')
      return []
    }
    // Retry with anon key if service key auth fails (proxy/JWT issues)
    const looksAuth = code === 'PGRST301' || msg.includes('invalid authentication') || msg.includes('no suitable key')
    if (looksAuth) {
      const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
      const anon = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      if (supabaseUrl && anon) {
        const supabaseAnon = createClient(supabaseUrl, anon, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } })
        const retry = await supabaseAnon
          .from('courses')
          .select(baseSelect)
          .eq('published', true)
          .order('id', { ascending: true })
        if (!retry.error) return retry.data ?? []
      }
    }
    if (msg.includes('column') && msg.includes('published')) {
      const { data: data2, error: error2 } = await supabase
        .from('courses')
        .select(baseSelect)
        .order('id', { ascending: true })
      if (error2) throw error2
      return data2 ?? []
    }
    throw error
  }
  return data ?? []
}

export async function GET() {
  try {
    const data = await getPublishedCourses()
    return NextResponse.json(data)
  } catch (err: any) {
    const code = err?.code || ''
    const msg = String(err?.message || '')
    const isAuth = code === 'PGRST301' || msg.toLowerCase().includes('invalid authentication')
    const status = isAuth ? 502 : 500
    const message = isAuth
      ? 'Upstream auth failed: verify JWT secret and headers through proxy'
      : (msg || 'Failed to load courses')
    return NextResponse.json({ message }, { status })
  }
}
