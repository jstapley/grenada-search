import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ListingDetailClient from './ListingDetailClient'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const { data: listings } = await supabase
    .from('listings')
    .select('slug')
    .eq('status', 'active')
  
  return listings?.map((listing) => ({
    slug: listing.slug,
  })) || []
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const { data: listing } = await supabase
    .from('listings')
    .select(`
      business_name, 
      short_description, 
      description,
      meta_title, 
      meta_description,
      image_url,
      slug,
      category:categories(name),
      parish:parishes(name)
    `)
    .eq('slug', resolvedParams.slug)
    .eq('status', 'active')
    .single()

  if (!listing) {
    return {
      title: 'Business Not Found'
    }
  }

  const title = listing.meta_title || `${listing.business_name} | ${listing.category?.name} in ${listing.parish?.name}, Grenada`
  const description = listing.meta_description || 
  listing.description?.substring(0, 155) || 
  listing.short_description || 
  `Discover ${listing.business_name}, a ${listing.category?.name} in ${listing.parish?.name}, Grenada. Contact us for more information.`

  return {
    title,
    description,
    keywords: [
      listing.business_name,
      listing.category?.name,
      listing.parish?.name,
      'grenada',
      'spice isle',
      'business',
      'tourism'
    ].filter(Boolean).join(', '),
    
    openGraph: {
      type: 'website', 
      url: `https://www.grenadasearch.com/listing/${listing.slug}`,
      title: listing.business_name,
      description: description,
      siteName: 'GrenadaSearch.com',
      images: listing.image_url ? [
        {
          url: listing.image_url,
          width: 1200,
          height: 630,
          alt: listing.business_name
        }
      ] : [],
      locale: 'en_US'
    },

    twitter: {
      card: 'summary_large_image',
      title: listing.business_name,
      description: description,
      images: listing.image_url ? [listing.image_url] : []
    },

    alternates: {
      canonical: `https://www.grenadasearch.com/listing/${listing.slug}`
    }
  }
}

async function getListing(slug) {
  const { data: listing } = await supabase
    .from('listings')
    .select(`
      *,
      category:categories(id, name, slug, icon_emoji),
      parish:parishes(id, name, slug)
    `)
    .eq('slug', slug)
    .eq('status', 'active')
    .single()
  
  return listing
}

async function checkIfClaimed(listingId) {
  const { data, error } = await supabase
    .from('claimed_listings')
    .select('id')
    .eq('listing_id', listingId)
  
  return data && data.length > 0
}

async function getRelatedListings(categoryId, parishId, currentListingId) {
  const { data: listings } = await supabase
    .from('listings')
    .select(`
      *,
      category:categories(name, icon_emoji),
      parish:parishes(name, slug)
    `)
    .eq('status', 'active')
    .neq('id', currentListingId)
    .or(`category_id.eq.${categoryId},parish_id.eq.${parishId}`)
    .order('featured', { ascending: false })
    .limit(3)
  
  return listings || []
}

export default async function ListingPage({ params }) {
  const resolvedParams = await params
  const listing = await getListing(resolvedParams.slug)
  
  if (!listing) {
    notFound()
  }
  
  const isClaimed = await checkIfClaimed(listing.id)
  const relatedListings = await getRelatedListings(
    listing.category?.id,
    listing.parish?.id,
    listing.id
  )

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": listing.business_name,
    "description": listing.description || listing.short_description || "",
    "image": listing.image_url || "https://www.grenadasearch.com/grenada-flag.png",
    "telephone": listing.phone || undefined,
    "email": listing.email || undefined,
    "url": listing.website || `https://www.grenadasearch.com/listing/${listing.slug}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": listing.address || "",
      "addressLocality": listing.parish?.name || "",
      "addressRegion": "Grenada",
      "addressCountry": "GD"
    },
    "geo": listing.latitude && listing.longitude ? {
      "@type": "GeoCoordinates",
      "latitude": parseFloat(listing.latitude),
      "longitude": parseFloat(listing.longitude)
    } : undefined,
    "aggregateRating": listing.average_rating ? {
      "@type": "AggregateRating",
      "ratingValue": listing.average_rating.toFixed(1),
      "reviewCount": listing.review_count || 0,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "priceRange": "$$"
  }

  Object.keys(localBusinessSchema).forEach(key => {
    if (localBusinessSchema[key] === undefined) delete localBusinessSchema[key]
  })

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.grenadasearch.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": listing.category?.name || "Category",
        "item": `https://www.grenadasearch.com/category/${listing.category?.slug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": listing.business_name,
        "item": `https://www.grenadasearch.com/listing/${listing.slug}`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <ListingDetailClient 
        listing={listing}
        isClaimed={isClaimed}
        relatedListings={relatedListings}
      />
    </>
  )
}

async function getListing(slug) {
  const { data: listing, error } = await supabase
    .from('listings')
    .select(`
      *,
      category:categories(id, name, slug, icon_emoji),
      parish:parishes(id, name, slug)
    `)
    .eq('slug', slug)
    .eq('status', 'active')
    .single()
  
  console.log('getListing result:', { slug, listing: !!listing, error })
  return listing
}