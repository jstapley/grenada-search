import { createClient } from '@supabase/supabase-js'
import https from 'https'
import http from 'http'
import { URL } from 'url'

// ============================================
// CONFIG — fill these in before running
// ============================================
const SUPABASE_URL = 'https://ougvhwgzobkfxsdkbjjn.supabase.co'
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91Z3Zod2d6b2JrZnhzZGtiampuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzc2MzgxMiwiZXhwIjoyMDg5MzM5ODEyfQ.zFlTj238eISm9MQmDNqMxdj74hWg9EPVvfoyG8GngwE'
const GOOGLE_API_KEY = 'AIzaSyDudNa3jiY1AEjfxsD6Jc316_h1EhiWixo'
const BUCKET_NAME = 'listing-images'
const BATCH_SIZE = 5
const BATCH_DELAY_MS = 500

// ============================================
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    const follow = (url, redirects = 0) => {
      if (redirects > 5) return reject(new Error('Too many redirects'))
      const parsed = new URL(url)
      const lib = parsed.protocol === 'https:' ? https : http
      lib.get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return follow(res.headers.location, redirects + 1)
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}`))
        }
        const chunks = []
        res.on('data', chunk => chunks.push(chunk))
        res.on('end', () => resolve({ buffer: Buffer.concat(chunks), contentType: res.headers['content-type'] }))
        res.on('error', reject)
      }).on('error', reject)
    }
    follow(url)
  })
}

async function searchGooglePlaces(businessName) {
  const query = encodeURIComponent(`${businessName} Grenada`)
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=place_id,name,photos&key=${GOOGLE_API_KEY}`
  
  const { buffer } = await downloadFile(url)
  const data = JSON.parse(buffer.toString())
  
  if (data.status !== 'OK' || !data.candidates || data.candidates.length === 0) {
    return null
  }
  
  const candidate = data.candidates[0]
  if (!candidate.photos || candidate.photos.length === 0) {
    return { placeId: candidate.place_id, photoReference: null }
  }
  
  return {
    placeId: candidate.place_id,
    photoReference: candidate.photos[0].photo_reference
  }
}

async function getPhotoUrl(photoReference) {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`
}

async function uploadToSupabase(buffer, contentType, listingId) {
  const ext = contentType?.includes('png') ? 'png' : 'jpg'
  const fileName = `listings/${listingId}-${Date.now()}.${ext}`
  
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, buffer, {
      contentType: contentType || 'image/jpeg',
      upsert: true
    })
  
  if (error) throw new Error(`Upload failed: ${error.message}`)
  
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName)
  
  return publicUrl
}

async function migrateListings() {
  console.log('🌴 GrenadaSearch Image Migration Starting...\n')

  // Fetch all listings with no image_url
  const { data: listings, error } = await supabase
    .from('listings')
    .select('id, business_name, place_id')
    .is('image_url', null)
    .order('business_name')

  if (error) {
    console.error('Failed to fetch listings:', error)
    process.exit(1)
  }

  console.log(`Found ${listings.length} listings without images\n`)

  const stats = {
    success: 0,
    noPhoto: 0,
    notFound: 0,
    error: 0
  }

  for (let i = 0; i < listings.length; i += BATCH_SIZE) {
    const batch = listings.slice(i, i + BATCH_SIZE)
    
    await Promise.all(batch.map(async (listing) => {
      try {
        console.log(`[${i + 1}/${listings.length}] Processing: ${listing.business_name}`)
        
        // Search Google Places
        const result = await searchGooglePlaces(listing.business_name)
        
        if (!result) {
          console.log(`  ⚠️  Not found on Google Places`)
          stats.notFound++
          return
        }
        
        if (!result.photoReference) {
          console.log(`  📷 No photo available`)
          // Still save the place_id even if no photo
          await supabase
            .from('listings')
            .update({ place_id: result.placeId })
            .eq('id', listing.id)
          stats.noPhoto++
          return
        }
        
        // Get photo URL
        const photoUrl = await getPhotoUrl(result.photoReference)
        
        // Download photo
        const { buffer, contentType } = await downloadFile(photoUrl)
        
        // Upload to Supabase
        const publicUrl = await uploadToSupabase(buffer, contentType, listing.id)
        
        // Update listing
        await supabase
          .from('listings')
          .update({
            image_url: publicUrl,
            place_id: result.placeId
          })
          .eq('id', listing.id)
        
        console.log(`  ✅ Success`)
        stats.success++
        
      } catch (err) {
        console.log(`  ❌ Error: ${err.message}`)
        stats.error++
      }
    }))
    
    if (i + BATCH_SIZE < listings.length) {
      await sleep(BATCH_DELAY_MS)
    }
  }

  console.log('\n==============================')
  console.log('🌴 Migration Complete!')
  console.log(`✅ Success:    ${stats.success}`)
  console.log(`📷 No photo:  ${stats.noPhoto}`)
  console.log(`⚠️  Not found: ${stats.notFound}`)
  console.log(`❌ Errors:    ${stats.error}`)
  console.log('==============================')
  console.log('\n⚠️  Remember to DELETE your temporary Google API key!')
}

migrateListings()