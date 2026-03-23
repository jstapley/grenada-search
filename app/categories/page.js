import { supabase } from '@/lib/supabase'
import CategoriesPageClient from './CategoriesPageClient'

export const revalidate = 3600

export const metadata = {
  title: 'Browse All Categories | GrenadaSearch.com',
  description: 'Explore all business categories in Grenada - restaurants, hotels, tours, activities, shopping, and more.',
  alternates: {
    canonical: 'https://www.grenadasearch.com/categories',
  },
  openGraph: {
    title: 'Browse All Categories | GrenadaSearch.com',
    description: 'Explore all business categories in Grenada - restaurants, hotels, tours, activities, shopping, and more.',
    url: 'https://www.grenadasearch.com/categories',
    siteName: 'GrenadaSearch.com',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.grenadasearch.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GrenadaSearch.com - Business Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Browse All Categories | GrenadaSearch.com',
    description: 'Explore all business categories in Grenada.',
    images: ['https://www.grenadasearch.com/og-image.jpg'],
  },
}

async function getCategories() {
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (!categories) return []

  const categoriesWithCounts = await Promise.all(
    categories.map(async (category) => {
      const { count } = await supabase
        .from('listings')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', category.id)
        .eq('status', 'active')
      return { ...category, listing_count: count || 0 }
    })
  )

  return categoriesWithCounts
}

export default async function CategoriesPage() {
  const categories = await getCategories()
  return <CategoriesPageClient categories={categories} />
}