import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import BlogPostClient from './BlogPostClient'

export const revalidate = 300
export const dynamicParams = true

export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published')
  return posts?.map(post => ({ slug: post.slug })) || []
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, meta_title, meta_description, featured_image, slug')
    .eq('slug', resolvedParams.slug)
    .eq('status', 'published')
    .single()

  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.meta_title || `${post.title} | GrenadaSearch Blog`,
    description: post.meta_description || post.excerpt || 'Read this article on GrenadaSearch.com',
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: post.featured_image ? [{ url: post.featured_image }] : [],
      url: `https://www.grenadasearch.com/blog/${post.slug}`,
    }
  }
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .eq('status', 'published')
    .single()

  if (!post) notFound()

  return <BlogPostClient post={post} />
}