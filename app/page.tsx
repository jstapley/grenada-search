import { supabase } from '@/lib/supabase'
import HomeClient from '../components/HomeClient'

export const metadata = {
  title: 'Grenada Business Directory | GrenadaSearch.com',
  description: 'Find local businesses, hotels, restaurants, tours and services in Grenada. The complete tourism and business directory with 200+ verified listings across all parishes.',
  keywords: [
    'grenada business directory',
    'grenada tourism',
    'grenada hotels',
    'grenada restaurants',
    'businesses in grenada',
    'grenada services',
    'carriacou businesses',
    'grenada travel guide',
    'find businesses grenada',
    'grenada local businesses',
    'grenada tourism directory',
    'spice isle directory'
  ].join(', '),
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.grenadasearch.com',
    siteName: 'GrenadaSearch.com',
    title: 'Grenada Business Directory',
    description: 'Find local businesses, hotels, restaurants, tours and services in Grenada. The complete tourism directory with 200+ verified listings.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GrenadaSearch.com - Discover Grenada'
      }
    ]
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Grenada Business Directory',
    description: 'Find local businesses, hotels, restaurants, tours and services in Grenada — the Spice Isle of the Caribbean.',
    images: ['/og-image.jpg']
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export const revalidate = 300

export default async function HomePage() {
  const [
    { count: totalListings },
    { data: parishes },
    { data: categories },
    { data: featuredListings },
    { count: monthlyVisitors }
  ] = await Promise.all([
    supabase
      .from('listings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active'),
    
    supabase
      .from('parishes')
      .select(`
        *,
        listings!inner(id)
      `)
      .eq('listings.status', 'active'),
    
    supabase
      .from('categories')
      .select(`
        *,
        listings(id)
      `)
      .order('name'),
    
    supabase
      .from('listings')
      .select(`
        *,
        category:categories(name, icon_emoji),
        parish:parishes(name)
      `)
      .eq('status', 'active')
      .eq('is_featured', true)
      .gt('featured_until', new Date().toISOString())
      .order('featured_position', { ascending: true })
      .order('created_at', { ascending: false })
      .limit(3),
    
    Promise.resolve({ count: 1247 })
  ])

  const parishesWithCounts = parishes?.map(parish => ({
    id: parish.id,
    name: parish.name,
    slug: parish.slug,
    description: parish.description,
    listing_count: parish.listings?.length || 0
  })) || []

  const categoriesWithCounts = categories?.map(category => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    icon_emoji: category.icon_emoji,
    listing_count: category.listings?.length || 0
  })) || []

  const stats = {
    total_listings: totalListings || 0,
    total_parishes: parishesWithCounts.length,
    total_categories: categoriesWithCounts.length
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GrenadaSearch.com",
    "alternateName": "Grenada Search",
    "url": "https://www.grenadasearch.com",
    "logo": "https://www.grenadasearch.com/grenada-flag.png",
    "description": "The complete business and tourism directory for Grenada with 200+ verified business listings across all parishes",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "St. George's",
      "addressRegion": "Grenada",
      "addressCountry": "GD"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@grenadasearch.com",
      "contactType": "Customer Service"
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GrenadaSearch.com",
    "url": "https://www.grenadasearch.com",
    "description": "Grenada Business Directory — the Spice Isle of the Caribbean",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.grenadasearch.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeClient 
        stats={stats}
        parishes={parishesWithCounts}
        categories={categoriesWithCounts}
        featuredListings={featuredListings || []}
        monthlyVisitors={monthlyVisitors || 1247}
      />
    </>
  )
}

