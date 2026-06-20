import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { listing_id, business_name, category, parish, existing_description } = await request.json()

    if (!listing_id || !business_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const prompt = `You are a local business directory writer for GrenadaSearch.com, Grenada's premier tourism and business directory — the Spice Isle of the Caribbean.

Write a short description and a full description for this business listing:

Business Name: ${business_name}
Category: ${category || 'Not specified'}
Parish: ${parish || 'Not specified'}
Existing info: ${existing_description || 'None provided'}

IMPORTANT RULES:
- Do NOT invent phone numbers, prices, hours of operation, or staff names you are not confident about
- Only use information that is clearly known or that can be reasonably inferred from the business name, category, and location
- Keep the tone warm, knowledgeable, and authentic to Grenada — the Spice Isle of the Caribbean
- Do not fabricate specific facts (exact founding dates, specific awards, named owners) unless explicitly provided

Respond with ONLY a JSON object in this exact format, no markdown code fences, no extra text:
{
  "short_description": "One punchy sentence under 150 characters",
  "description": "150-250 word description in 2-3 paragraphs covering what the business offers, its location/category context within Grenada, and why a visitor or local would want to use it"
}`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    })

    let responseText = message.content[0].text.trim()

    // Strip markdown code fences if present
    responseText = responseText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '')

    let parsed
    try {
      parsed = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Failed to parse Claude response:', responseText)
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 })
    }

    const short_description = (parsed.short_description || '').slice(0, 150)
    const description = parsed.description || ''

    return NextResponse.json({
      listing_id,
      short_description,
      description,
    })

  } catch (error) {
    console.error('Enrichment error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}