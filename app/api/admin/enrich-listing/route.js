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

Respond with ONLY a valid JSON object in this exact format, no markdown code fences, no extra text, no additional keys:
{
  "short_description": "One punchy sentence under 150 characters",
  "description": "A SINGLE STRING containing 150-250 words. If you use multiple paragraphs, join them inside this one string value using \\n\\n between paragraphs. Do NOT create separate JSON values for each paragraph — everything must be inside this one description string."
}

CRITICAL: Your response must be parseable by JSON.parse(). It must have EXACTLY two keys: short_description and description. Do not add extra top-level string values, arrays, or additional keys.`

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

      // Attempt recovery: extract short_description and description with regex as a fallback
      const shortMatch = responseText.match(/"short_description"\s*:\s*"([^"]+)"/)
      const descMatch = responseText.match(/"description"\s*:\s*"([\s\S]+?)"\s*[,}]/)

      if (shortMatch && descMatch) {
        parsed = {
          short_description: shortMatch[1],
          description: descMatch[1]
        }
        console.log('Recovered via regex fallback')
      } else {
        return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 })
      }
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