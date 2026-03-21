import { supabase } from '@/lib/supabase'
import BlogListClient from './BlogListClient'

export const metadata = {
  title: 'Blog | GrenadaSearch.com',
  description: 'Tips, guides, and insights about businesses and travel in Grenada — the Spice Isle of the Caribbean.',
}

export const revalidate = 300

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, author, tags, published_at, created_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  return <BlogListClient posts={posts || []} />
}