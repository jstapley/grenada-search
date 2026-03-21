import { supabase } from '@/lib/supabase'
import FeaturedPageClient from './FeaturedPageClient'

export const metadata = {
  title: 'Featured Businesses - GrenadaSearch.com | Premium Listings',
  description: 'Discover top-rated featured businesses in Grenada. Premium verified listings offering exceptional service across the Spice Isle.',
}

export const revalidate = 300

export default async function FeaturedPage() {
  const { data: featuredListings } = await supabase
    .from('listings')
    .select(`
      *,
      category:categories(name, icon),
      parish:parishes(name)
    `)
    .eq('status', 'active')
    .eq('featured', true)
    .order('created_at', { ascending: false })

  return <FeaturedPageClient featuredListings={featuredListings || []} />
}