import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { 
        auth: { autoRefreshToken: false, persistSession: false },
        db: { schema: 'public' },
        global: {
          headers: {
            'Range-Unit': 'items',
            'Range': '0-9999'
          }
        }
      }
    )

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (type === 'stats') {
      let allData = []
      let from = 0
      const batchSize = 1000

      while (true) {
        const { data, error } = await supabaseAdmin
          .from('listings')
          .select('status')
          .range(from, from + batchSize - 1)

        if (error) throw error
        if (!data || data.length === 0) break
        allData = allData.concat(data)
        if (data.length < batchSize) break
        from += batchSize
      }

      return NextResponse.json({ data: allData })
    }

    if (type === 'listings') {
      let allData = []
      let from = 0
      const batchSize = 1000

      while (true) {
        const { data, error } = await supabaseAdmin
          .from('listings')
          .select(`*, category:categories(name, icon), parish:parishes(name)`)
          .order('created_at', { ascending: false })
          .range(from, from + batchSize - 1)

        if (error) throw error
        if (!data || data.length === 0) break
        allData = allData.concat(data)
        if (data.length < batchSize) break
        from += batchSize
      }

      return NextResponse.json({ data: allData })
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}