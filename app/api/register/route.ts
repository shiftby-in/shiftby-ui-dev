import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../src/lib/supabase-server'

type Payload = {
  first_name?: string
  last_name?: string
  email?: string
  mobile?: string
  course_id?: string
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
    if (!course_id || typeof course_id !== 'string') missing.push('course_id')

    if (missing.length) {
      return NextResponse.json(
        { message: `Missing or invalid fields: ${missing.join(', ')}` },
        { status: 400 }
      )
    }

    const supabase = supabaseAdmin

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
