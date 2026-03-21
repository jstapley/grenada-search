'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export default function BlogPostClient({ post }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-[#007A5E] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/grenada-flag.png" alt="Grenada Flag" width={50} height={50} className="rounded-full" />
              <div>
                <div className="text-lg md:text-xl font-bold text-gray-900">GRENADA</div>
                <div className="text-xs md:text-sm text-[#007A5E] font-semibold">GRENADA SEARCH</div>
              </div>
            </Link>
            <nav className="hidden lg:flex gap-6 items-center">
              <Link href="/" className="text-gray-700 hover:text-[#007A5E] font-medium">Home</Link>
              <Link href="/parishes" className="text-gray-700 hover:text-[#007A5E] font-medium">Browse Parishes</Link>
              <Link href="/categories" className="text-gray-700 hover:text-[#007A5E] font-medium">Categories</Link>
              <Link href="/blog" className="text-[#007A5E] font-semibold">Blog</Link>
              <Link href="/about" className="text-gray-700 hover:text-[#007A5E] font-medium">About Us</Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#007A5E] font-medium">Contact</Link>
              <Link href="/add-listing" className="bg-[#007A5E] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#005F48] transition">
                + Add Your Business
              </Link>
            </nav>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-gray-700 p-2">
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-3">
              <Link href="/" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/blog" className="block text-[#007A5E] font-semibold py-2" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
              <Link href="/add-listing" className="block bg-[#007A5E] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#005F48] transition text-center" onClick={() => setMobileMenuOpen(false)}>+ Add Your Business</Link>
            </nav>
          )}
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#007A5E]">Home</Link>
          <span className="mx-2">→</span>
          <Link href="/blog" className="hover:text-[#007A5E]">Blog</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-900">{post.title}</span>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="bg-[#E8F5F1] text-[#007A5E] text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
          <span>By {post.author}</span>
          <span>•</span>
          <span>{new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-10">
            <Image src={post.featured_image} alt={post.title} fill className="object-cover" />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-gray-900
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-[#007A5E] prose-a:font-semibold hover:prose-a:text-[#005F48]
          prose-strong:text-gray-900
          prose-ul:my-4 prose-li:text-gray-700
          prose-blockquote:border-l-4 prose-blockquote:border-[#007A5E] prose-blockquote:pl-4 prose-blockquote:italic
          prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
          prose-hr:border-gray-200">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#007A5E] font-semibold hover:text-[#005F48] transition">
            ← Back to Blog
          </Link>
        </div>
      </article>

      <footer className="bg-gray-900 text-white py-8 md:py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-400 text-sm">© 2026 GrenadaSearch.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}