'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function CategoriesPageClient({ categories }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Top Stats Banner */}
      <div className="bg-[#007A5E] text-white py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-center md:text-left">
              <span className="text-2xl">📊</span>
              <div>
                <span className="font-bold text-lg md:text-xl">1,247 people</span>
                <span className="text-sm md:text-base ml-1">browsing this month</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-center">
              <span className="text-xl">🏪</span>
              <span className="text-sm md:text-base">Own a business?</span>
              <Link href="/add-listing" className="text-[#FCD116] font-semibold underline hover:text-[#e0bc10] text-sm md:text-base whitespace-nowrap">
                Get premium visibility
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
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
              <Link href="/categories" className="text-[#007A5E] font-semibold">Categories</Link>
              <Link href="/about" className="text-gray-700 hover:text-[#007A5E] font-medium">About Us</Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#007A5E] font-medium">Contact</Link>
              <Link href="/add-listing" className="bg-[#007A5E] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#005F48] transition">
                + Add Your Business
              </Link>
            </nav>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-gray-700 p-2" aria-label="Toggle menu">
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
              <Link href="/categories" className="block text-[#007A5E] font-semibold py-2" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
              <Link href="/about" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link href="/contact" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link href="/add-listing" className="block bg-[#007A5E] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#005F48] transition text-center" onClick={() => setMobileMenuOpen(false)}>
                + Add Your Business
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <Link href="/" className="text-[#007A5E] hover:text-[#005F48]">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700 font-semibold">All Categories</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <section className="bg-[#007A5E] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            Browse All Categories
          </h1>
          <p className="text-base md:text-xl text-white/90 max-w-3xl mx-auto px-4">
            From fine dining to adventure tours, discover the best businesses and attractions 
            across Grenada organized by category.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 md:p-8 text-center hover:shadow-2xl hover:border-[#007A5E] transition-all duration-300 group"
            >
              <div className="text-4xl md:text-6xl mb-3 md:mb-4">{category.icon}</div>
              <h2 className="font-bold text-base md:text-xl text-gray-900 mb-2 group-hover:text-[#007A5E] transition">
                {category.name}
              </h2>
              <div className="text-gray-600 font-semibold mb-3 md:mb-4 text-sm md:text-base">
                {category.listing_count} listings
              </div>
              <div className="text-[#007A5E] font-bold text-xs md:text-sm group-hover:translate-y-1 transition-transform">
                Explore ↓
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Categories */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
            Discover Grenada by Category
          </h2>
          <div className="text-gray-600 space-y-4 text-base md:text-lg">
            <p>
              Whether you&apos;re looking for a romantic beachfront restaurant, an adventure tour, 
              or a luxury resort, our category directory makes it easy to find exactly what you need.
            </p>
            <p>
              Browse through our carefully organized categories to discover the best that Grenada 
              has to offer. Each category features verified businesses with detailed information, photos, 
              and contact details to help you plan your perfect island experience.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to List Your Business?
          </h3>
          <p className="text-gray-600 mb-6 md:mb-8 text-lg md:text-xl max-w-2xl mx-auto px-4">
            Join businesses across Grenada reaching visitors from around the world
          </p>
          <Link
            href="/add-listing"
            className="inline-block bg-[#007A5E] text-white px-8 md:px-12 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl hover:bg-[#005F48] transition shadow-lg"
          >
            Get Listed Today - It&apos;s Free! →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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
              <h6 className="font-bold mb-4 text-base md:text-lg">Contact</h6>
              <p className="text-gray-400 text-sm mb-2">contact@grenadasearch.com</p>
              <p className="text-gray-400 text-sm">St. George&apos;s, Grenada</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 md:pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2026 Grenada Search. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}