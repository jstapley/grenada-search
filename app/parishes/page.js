import { supabase } from '@/lib/supabase'
import ParishesPageClient from './ParishesPageClient'

export const revalidate = 3600

export const metadata = {
  title: 'Parishes in Grenada — Find Local Businesses by Location',
  description: 'Browse businesses across all parishes in Grenada — St. George\'s, St. Andrew, and more. Find hotels, restaurants, tours and local services near you.',
  alternates: {
    canonical: 'https://www.grenadasearch.com/parishes',
  },
}

async function getParishes() {
  const { data: parishes } = await supabase
    .from('parishes')
    .select('*')
    .order('name', { ascending: true })

  if (!parishes) return []

  // Fetch listing counts for each parish
  const parishesWithCounts = await Promise.all(
    parishes.map(async (parish) => {
      const { count } = await supabase
        .from('listings')
        .select('*', { count: 'exact', head: true })
        .eq('parish_id', parish.id)
        .eq('status', 'active')
      return { ...parish, listing_count: count || 0 }
    })
  )

  return parishesWithCounts
}

export default async function ParishesPage() {
  const parishes = await getParishes()
  return <ParishesPageClient parishes={parishes} />
}