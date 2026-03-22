import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (type === 'stats') {
      const { data, error } = await supabaseAdmin
        .from('listings')
        .select('status')
        .range(0, 9999)

      if (error) throw error
      return NextResponse.json({ data })
    }

    if (type === 'listings') {
      const { data, error } = await supabaseAdmin
        .from('listings')
        .select(`*, category:categories(name, icon), parish:parishes(name)`)
        .order('created_at', { ascending: false })
        .range(0, 9999)

      if (error) throw error
      return NextResponse.json({ data })
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}