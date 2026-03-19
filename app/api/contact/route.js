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

async function sendContactNotification(formData) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured')
    return
  }

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'contact@grenadasearch.com',
      to: 'jeff@stapleyinc.com',
      subject: `📬 New Contact Form: ${formData.subject || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #007A5E; padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
            <p style="color: #FCD116; margin: 8px 0 0 0;">GrenadaSearch.com</p>
          </div>

          <div style="padding: 30px; background: #f9fafb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563; width: 140px;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${formData.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${formData.email}" style="color: #007A5E;">${formData.email}</a></td>
              </tr>
              ${formData.phone ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="tel:${formData.phone}" style="color: #007A5E;">${formData.phone}</a></td>
              </tr>` : ''}
              ${formData.subject ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Subject:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${formData.subject}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Type:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
                  <span style="background: ${formData.businessInquiry ? '#FCD116' : '#e5e7eb'}; color: ${formData.businessInquiry ? '#1a1a1a' : '#4b5563'}; padding: 3px 10px; border-radius: 12px; font-size: 13px; font-weight: 600;">
                    ${formData.businessInquiry ? 'Business Inquiry' : 'General'}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #4b5563; vertical-align: top;">Message:</td>
                <td style="padding: 10px; color: #1f2937; white-space: pre-wrap;">${formData.message}</td>
              </tr>
            </table>

            <div style="margin-top: 30px; text-align: center;">
              <a href="mailto:${formData.email}" style="background: #007A5E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Reply to ${formData.name} →
              </a>
            </div>
          </div>

          <div style="background: #1f2937; padding: 20px; text-align: center; color: #9ca3af; font-size: 14px;">
            <p style="margin: 0;">GrenadaSearch.com — Contact Form Notification</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission — GrenadaSearch.com

Name: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}
${formData.subject ? `Subject: ${formData.subject}` : ''}
Type: ${formData.businessInquiry ? 'Business Inquiry' : 'General'}

Message:
${formData.message}
      `
    })
  })
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

    // 1. Save to Supabase
    const { error: dbError } = await supabaseAdmin
      .from('contact_submissions')
      .insert([{
        sender_name:      formData.name,
        sender_email:     formData.email,
        sender_phone:     formData.phone || null,
        message:          formData.message,
        business_inquiry: formData.businessInquiry,
        status:           'new'
      }])

    if (dbError) {
      console.error('Database error:', dbError)
    }

    // 2. Send email via Resend
    try {
      await sendContactNotification(formData)
      console.log('✅ Contact notification email sent')
    } catch (emailError) {
      console.error('❌ Email notification failed:', emailError)
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