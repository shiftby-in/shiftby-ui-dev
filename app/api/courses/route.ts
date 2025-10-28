import { NextResponse } from 'next/server'
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
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnon =
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ''

  if (!supabaseUrl || !supabaseAnon) {
    throw new Error('Supabase URL or anon key missing')
  }

  const supabase = createClient(supabaseUrl, supabaseAnon, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })

  // Try with published=true, then gracefully fall back if column is missing
  const baseSelect = 'id,title,summary,level,price_usd,cover_url'
  const { data, error } = await supabase
    .from('courses')
    .select(baseSelect)
    .eq('published', true)
    .order('id', { ascending: true })

  if (error) {
    const msg = (error as any)?.message?.toLowerCase?.() || ''
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
    return NextResponse.json(
      { message: err?.message || 'Failed to load courses' },
      { status: 500 }
    )
  }
}
