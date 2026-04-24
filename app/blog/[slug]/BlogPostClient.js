'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { useAuth } from '@/lib/AuthContext'

export default function BlogPostClient({ post }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuth()

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
              <Link href="/about" className="text-gray-700 hover:text-[#007A5E] font-medium">About Us</Link>
              <Link href="/blog" className="text-[#007A5E] font-semibold">Blog</Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#007A5E] font-medium">Contact</Link>
              {user ? (
                <Link href="/dashboard" className="text-gray-700 hover:text-[#007A5E] font-medium">Dashboard</Link>
              ) : (
                <Link href="/login" className="text-gray-700 hover:text-[#007A5E] font-medium">Login</Link>
              )}
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
              <Link href="/parishes" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Browse Parishes</Link>
              <Link href="/categories" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
              <Link href="/about" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link href="/blog" className="block text-[#007A5E] font-semibold py-2" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
              <Link href="/contact" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              {user ? (
                <Link href="/dashboard" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              ) : (
                <Link href="/login" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              )}
              <Link href="/add-listing" className="block bg-[#007A5E] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#005F48] transition text-center" onClick={() => setMobileMenuOpen(false)}>+ Add Your Business</Link>
            </nav>
          )}
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#007A5E]">Home</Link>
          <span className="mx-2">→</span>
          <Link href="/blog" className="hover:text-[#007A5E]">Blog</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-900">{post.title}</span>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="bg-[#E8F5F1] text-[#007A5E] text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
          <span>By {post.author}</span>
          <span>•</span>
          <span>{new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>

        {post.featured_image && (
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-10">
            <Image src={post.featured_image} alt={post.title} fill className="object-cover" />
          </div>
        )}

        <div className="max-w-none text-gray-700">
          <ReactMarkdown
            components={{
              h1: ({children}) => <h1 className="text-3xl font-extrabold text-gray-900 mt-10 mb-4">{children}</h1>,
              h2: ({children}) => <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">{children}</h2>,
              h3: ({children}) => <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">{children}</h3>,
              p: ({children}) => <p className="text-gray-700 leading-relaxed mb-5 text-base md:text-lg">{children}</p>,
              a: ({href, children}) => <a href={href} className="text-[#007A5E] font-semibold underline hover:text-[#005F48] transition">{children}</a>,
              strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
              ul: ({children}) => <ul className="list-disc list-outside ml-6 mb-5 space-y-2">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal list-outside ml-6 mb-5 space-y-2">{children}</ol>,
              li: ({children}) => <li className="text-gray-700 text-base md:text-lg leading-relaxed">{children}</li>,
              blockquote: ({children}) => <blockquote className="border-l-4 border-[#007A5E] pl-4 italic text-gray-600 my-6 bg-[#F0FAF7] py-3 pr-4 rounded-r-lg">{children}</blockquote>,
              hr: () => <hr className="border-gray-200 my-8" />,
              code: ({children}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#007A5E] font-semibold hover:text-[#005F48] transition">
            ← Back to Blog
          </Link>
        </div>
      </article>

      <footer className="bg-gray-900 text-white py-8 md:py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/grenada-flag.png" alt="Grenada Flag" width={40} height={40} className="rounded-full" />
                <div>
                  <div className="font-bold text-base md:text-lg">Grenada Search</div>
                  <div className="text-xs md:text-sm text-gray-400">Directory</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Your complete guide to experiencing the best of Grenada — the Spice Isle of the Caribbean</p>
            </div>
            <div>
              <h6 className="font-bold mb-4 text-base md:text-lg">Quick Links</h6>
              <div className="space-y-2 text-sm">
                <Link href="/" className="block text-gray-400 hover:text-white transition">Home</Link>
                <Link href="/parishes" className="block text-gray-400 hover:text-white transition">Browse Parishes</Link>
                <Link href="/categories" className="block text-gray-400 hover:text-white transition">All Categories</Link>
                <Link href="/blog" className="block text-gray-400 hover:text-white transition">Blog</Link>
                <Link href="/about" className="block text-gray-400 hover:text-white transition">About Us</Link>
              </div>
            </div>
            <div>
              <h6 className="font-bold mb-4 text-base md:text-lg">For Business</h6>
              <div className="space-y-2 text-sm">
                <Link href="/add-listing" className="block text-gray-400 hover:text-white transition">List Your Business</Link>
                <Link href="/advertise" className="block text-gray-400 hover:text-white transition">Advertise With Us</Link>
                <Link href="/pricing" className="block text-gray-400 hover:text-white transition">Pricing</Link>
              </div>
            </div>
            <div>
              <h6 className="font-bold mb-4 text-base md:text-lg">Websites</h6>
              <div className="space-y-2 text-sm">
                <a href="https://www.grenadasearch.com" className="block text-gray-400 hover:text-white transition">GrenadaSearch.com</a>
                <a href="https://www.antiguasearch.com" className="block text-gray-400 hover:text-white transition">AntiguaSearch.com</a>
                <a href="https://www.stapleyinc.com" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition">StapleyInc.com</a>
                <a href="https://www.antiguamarinesolutions.com" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition">AntiguaMarineSolutions.com</a>
              </div>
            </div>
            <div>
              <h6 className="font-bold mb-4 text-base md:text-lg">Contact</h6>
              <p className="text-gray-400 text-sm mb-2">contact@grenadasearch.com</p>
              <p className="text-gray-400 text-sm">St. George's, Grenada</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 md:pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2026 GrenadaSearch.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}