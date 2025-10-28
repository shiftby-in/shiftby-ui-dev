import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

type Payload = {
  first_name?: string
  last_name?: string
  email?: string
  mobile?: string
  course_id?: number
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as Payload

    const first_name = (body.first_name || '').trim()
    const last_name = (body.last_name || '').trim()
    const email = (body.email || '').trim()
    const mobile = (body.mobile || '').trim()
    const course_id = body.course_id

    const missing: string[] = []
    if (!first_name) missing.push('first_name')
    if (!last_name) missing.push('last_name')
    if (!email) missing.push('email')
    if (!mobile) missing.push('mobile')
    if (typeof course_id !== 'number') missing.push('course_id')

    if (missing.length) {
      return NextResponse.json(
        { message: `Missing or invalid fields: ${missing.join(', ')}` },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    // Prefer service role key for inserts; fall back to anon key if policies allow
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ message: 'Supabase not configured' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    })

    const { error } = await supabase.from('registrations').insert([
      { first_name, last_name, email, mobile, course_id },
    ])

    if (error) {
      return NextResponse.json(
        { message: error.message || 'Failed to register' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json(
      { message: err?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

