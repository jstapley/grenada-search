'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function FeaturedPageClient({ featuredListings }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
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
              <Link href="/categories" className="text-gray-700 hover:text-[#007A5E] font-medium">Categories</Link>
              <Link href="/about" className="text-gray-700 hover:text-[#007A5E] font-medium">About Us</Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#007A5E] font-medium">Contact</Link>
              <Link href="/login" className="text-gray-700 hover:text-[#007A5E] font-medium">Login</Link>
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
              <Link href="/categories" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Categories</Link>
              <Link href="/about" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link href="/contact" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link href="/login" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link href="/add-listing" className="block bg-[#007A5E] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#005F48] transition text-center" onClick={() => setMobileMenuOpen(false)}>+ Add Your Business</Link>
            </nav>
          )}
        </div>
      </header>

      {/* Hero */}
      <div className="bg-[#007A5E] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 md:mb-6">
            <Link href="/" className="text-white/80 hover:text-white text-sm md:text-base">Home</Link>
            <span className="text-white/60 mx-2">→</span>
            <span className="text-white font-semibold text-sm md:text-base">Featured Businesses</span>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#FCD116] px-4 py-2 rounded-full mb-4">
              <span className="text-2xl">⭐</span>
              <span className="font-bold text-[#1a1a1a] text-sm md:text-base">PREMIUM LISTINGS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              Featured Businesses
            </h1>
            <p className="text-base md:text-xl text-white/90 max-w-3xl mx-auto">
              Discover top-rated businesses offering exceptional service across Grenada. 
              These premium listings have been verified and recommended.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {featuredListings.length} Featured {featuredListings.length === 1 ? 'Business' : 'Businesses'}
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Premium listings receive priority placement and enhanced visibility
          </p>
        </div>

        {featuredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredListings.map((listing) => (
              <Link
                key={listing.id}
                href={`/listing/${listing.slug}`}
                className="relative bg-white rounded-2xl overflow-hidden border-4 border-[#FCD116] shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="absolute top-4 left-4 z-10 bg-[#FCD116] text-[#1a1a1a] px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                  <span className="text-lg">⭐</span>
                  <span>Featured</span>
                </div>
                <div className="relative h-56 md:h-64 bg-gray-200 overflow-hidden">
                  {listing.image_url ? (
                    <Image src={listing.image_url} alt={listing.business_name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl md:text-7xl">
                      {listing.category?.icon || '🏢'}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#007A5E] transition">
                    {listing.business_name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">{listing.category?.icon} {listing.category?.name}</span>
                    <span className="flex items-center gap-1">📍 {listing.parish?.name}</span>
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-2 text-sm md:text-base">
                    {listing.short_description || listing.description}
                  </p>
                  {listing.average_rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center bg-[#FEF9E0] px-3 py-1 rounded-full">
                        <span className="text-[#c9a800] mr-1">⭐</span>
                        <span className="font-bold text-gray-900">{listing.average_rating.toFixed(1)}</span>
                      </div>
                      {listing.review_count > 0 && (
                        <span className="text-sm text-gray-600">({listing.review_count} reviews)</span>
                      )}
                    </div>
                  )}
                  <div className="text-[#007A5E] font-bold flex items-center gap-2 text-base md:text-lg">
                    View Details
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Featured Businesses Yet</h3>
            <p className="text-gray-600 mb-6">Check back soon for premium listings!</p>
            <Link href="/" className="inline-block bg-[#007A5E] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#005F48] transition">
              Back to Home
            </Link>
          </div>
        )}

        {featuredListings.length > 0 && (
          <div className="mt-16 bg-[#007A5E] rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Want Premium Visibility?</h3>
            <p className="text-base md:text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Get your business featured with priority placement, enhanced visibility, and a gold border that stands out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/add-listing" className="bg-[#FCD116] text-[#1a1a1a] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#e0bc10] transition">
                List Your Business
              </Link>
              <Link href="/contact" className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition border-2 border-white/50">
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
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
              <p className="text-gray-400 text-sm">St. George&apos;s, Grenada</p>
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