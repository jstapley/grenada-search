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
  
  return parishes || []
}

export default async function ParishesPage() {
  const parishes = await getParishes()
  return <ParishesPageClient parishes={parishes} />
}