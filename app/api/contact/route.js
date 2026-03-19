import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function verifyTurnstile(token) {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
    }),
  })
  const data = await response.json()
  return data.success
}

export async function POST(request) {
  try {
    const formData = await request.json()

    const turnstileValid = await verifyTurnstile(formData.turnstileToken)
    if (!turnstileValid) {
      return NextResponse.json(
        { success: false, error: 'Security check failed. Please try again.' },
        { status: 400 }
      )
    }

    console.log('📝 Contact Form Submission:', { name: formData.name, email: formData.email })

    // 1. Save to Supabase — map form fields to table columns, no .select() to avoid RLS issue
    const { error: dbError } = await supabaseAdmin
      .from('contact_submissions')
      .insert([{
        sender_name:    formData.name,
        sender_email:   formData.email,
        sender_phone:   formData.phone || null,
        message:        formData.message,
        business_inquiry: formData.businessInquiry,
        status:         'new'
      }])

    if (dbError) {
      console.error('Database error:', dbError)
    }

    // 2. Send to GHL
    const ghlApiKey = process.env.GHL_API_KEY
    const ghlLocationId = process.env.GHL_LOCATION_ID

    if (ghlApiKey && ghlLocationId) {
      try {
        const ghlContactResponse = await fetch(
          'https://services.leadconnectorhq.com/contacts/',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${ghlApiKey}`,
              'Content-Type': 'application/json',
              'Version': '2021-07-28'
            },
            body: JSON.stringify({
              firstName: formData.name.split(' ')[0],
              lastName: formData.name.split(' ').slice(1).join(' '),
              email: formData.email,
              phone: formData.phone || '',
              source: 'Grenada Search - Contact Form',
              tags: formData.businessInquiry ? ['Business Inquiry', 'Contact Form'] : ['Contact Form'],
              customFields: [
                { key: 'contact_subject', value: formData.subject },
                { key: 'contact_message', value: formData.message },
                { key: 'inquiry_type', value: formData.businessInquiry ? 'Business' : 'General' }
              ],
              locationId: ghlLocationId
            })
          }
        )
        if (!ghlContactResponse.ok) {
          console.error('GHL API error:', await ghlContactResponse.text())
        }
      } catch (ghlError) {
        console.error('GHL integration error:', ghlError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully'
    })

  } catch (error) {
    console.error('Contact form API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}