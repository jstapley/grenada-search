'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPageClient() {
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

            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-gray-700 hover:text-[#007A5E] font-medium">Home</Link>
              <Link href="/parishes" className="text-gray-700 hover:text-[#007A5E] font-medium">Browse Parishes</Link>
              <Link href="/categories" className="text-gray-700 hover:text-[#007A5E] font-medium">Categories</Link>
              <Link href="/about" className="text-[#007A5E] font-bold">About Us</Link>
              <Link href="/blog" className="text-gray-700 hover:text-[#007A5E] font-medium">Blog</Link>
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
              <Link href="/about" className="block text-[#007A5E] font-bold py-2" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
              <Link href="/blog" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
              <Link href="/contact" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link href="/login" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link href="/add-listing" className="block bg-[#007A5E] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#005F48] transition text-center" onClick={() => setMobileMenuOpen(false)}>
                + Add Your Business
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Hero */}
      <div className="bg-[#007A5E] text-white py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6">About GrenadaSearch.com</h1>
          <p className="text-base md:text-xl text-white/90 px-4">
            Making it easier for businesses to be found and for visitors to discover Grenada — the Spice Isle of the Caribbean
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Our Story */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Our Story</h2>
          <div className="prose prose-sm md:prose-lg max-w-none text-gray-700 space-y-4">
            <p className="text-sm md:text-base">
              My connection to the Caribbean began in 2000 when my wife and I got married at the beautiful Jolly Beach Resort 
              in Antigua. What started as a destination wedding turned into a lifelong love affair with the islands. We&apos;ve been 
              visiting and exploring the region ever since, watching these communities evolve and grow.
            </p>
            <p className="text-sm md:text-base">
              After building AntiguaSearch.com — the leading business directory for Antigua &amp; Barbuda — we saw the same need 
              in Grenada. The Spice Isle is full of incredible businesses, restaurants, tours, and hidden gems that visitors 
              and locals struggle to find in one place.
            </p>
            <p className="text-sm md:text-base">
              As a business owner myself, I understand the challenges that come with getting discovered. Traditional marketing 
              is expensive, and there wasn&apos;t a single, comprehensive platform where Grenada businesses could list themselves 
              and track their visibility.
            </p>
            <p className="font-semibold text-gray-900 text-sm md:text-base">
              That&apos;s why I created GrenadaSearch.com — to solve the exact problem local businesses face every day.
            </p>
          </div>
        </section>

        {/* The Challenge */}
        <section className="mb-12 md:mb-16 bg-gray-50 rounded-2xl p-6 md:p-8 border-2 border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">The Challenge</h2>
          <div className="space-y-4 text-gray-700">
            <p className="text-base md:text-lg">If you own a business in Grenada, you know these challenges:</p>
            <ul className="space-y-3">
              {[
                'Your business information is scattered across multiple platforms – Facebook, Instagram, TripAdvisor, Google Maps',
                'You have no idea how many people are actually finding you online',
                'Traditional advertising is expensive and results are hard to measure',
                'Tourists struggle to find comprehensive, reliable information about local businesses',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-xl md:text-2xl flex-shrink-0">❌</span>
                  <span className="text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Our Solution */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Our Solution</h2>
          <div className="space-y-6">
            <p className="text-base md:text-lg text-gray-700">
              GrenadaSearch.com is the single destination where businesses can showcase themselves and visitors can discover 
              everything Grenada has to offer.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                { emoji: '🎯', title: 'One Central Location', body: 'All your business information in one place – making it effortless for customers to find you' },
                { emoji: '📊', title: 'Real Analytics', body: 'See exactly how many people view your listing, click your phone number, visit your website, and more' },
                { emoji: '✨', title: 'Easy to Manage', body: 'Update your information anytime with our simple dashboard – no technical skills required' },
                { emoji: '🌿', title: 'Reach More Visitors', body: 'Connect with thousands of tourists and locals actively searching for businesses like yours' },
              ].map(({ emoji, title, body }) => (
                <div key={title} className="bg-[#F0FAF7] rounded-xl p-4 md:p-6 border-2 border-[#B3DDD4]">
                  <div className="text-2xl md:text-3xl mb-2 md:mb-3">{emoji}</div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-700 text-sm md:text-base">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-12 md:mb-16 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 border-2 border-green-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Benefits for Business Owners</h2>
          <div className="space-y-4">
            {[
              { title: 'Get Found Easily', body: 'Tourists and locals searching for businesses in your category will discover you instantly' },
              { title: 'Track Your Performance', body: 'Know exactly how your listing is performing with detailed analytics on views, clicks, and searches' },
              { title: 'Build Your Reputation', body: 'Collect and showcase customer reviews that build trust and credibility' },
              { title: 'Stay Competitive', body: 'Keep your business visible alongside established competitors with professional listings' },
              { title: 'Understand Your Analytics', body: "No complex dashboards or confusing metrics – we present your data in a way that's easy to understand and act on" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 md:gap-4">
                <div className="bg-[#007A5E] text-white rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center flex-shrink-0 font-bold text-sm md:text-base">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-700 text-sm md:text-base">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Commitment */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Our Commitment</h2>
          <div className="prose prose-sm md:prose-lg max-w-none text-gray-700 space-y-4">
            <p className="text-sm md:text-base">
              Having built AntiguaSearch.com from the ground up, I understand what it takes to create a platform that 
              actually works for Caribbean businesses. GrenadaSearch.com brings that same experience and commitment to 
              the Spice Isle — built by someone who genuinely wants to see local businesses thrive.
            </p>
            <p className="text-sm md:text-base">
              We&apos;re committed to continuously improving the platform, adding features that matter to you, and ensuring 
              that your business gets the visibility it deserves. When you succeed, we succeed.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#007A5E] text-white rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Your Business Discovered?</h2>
          <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 px-4">
            Join businesses already using GrenadaSearch.com to reach more customers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/add-listing" className="bg-[#FCD116] text-[#1a1a1a] px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-[#e0bc10] transition inline-block">
              List Your Business Free
            </Link>
            <Link href="/contact" className="bg-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-white/30 transition inline-block border-2 border-white/50">
              Contact Us
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/grenada-flag.png" alt="Grenada Flag" width={40} height={40} className="rounded-full" />
                <div>
                  <div className="font-bold text-base md:text-lg">GRENADA</div>
                  <div className="text-xs md:text-sm text-[#007A5E]">GRENADA SEARCH</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Your complete guide to discovering Grenada — the Spice Isle of the Caribbean</p>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-base md:text-lg">Explore</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
                <li><Link href="/parishes" className="hover:text-white">Browse by Parish</Link></li>
                <li><Link href="/search" className="hover:text-white">Search</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-base md:text-lg">For Businesses</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/add-listing" className="hover:text-white">Add Your Business</Link></li>
                <li><Link href="/login" className="hover:text-white">Business Login</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              </ul>
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
              <h3 className="font-bold mb-4 text-base md:text-lg">Contact</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="mailto:contact@grenadasearch.com" className="hover:text-white break-all">contact@grenadasearch.com</a></li>
                <li>St. George&apos;s, Grenada</li>
                <li><Link href="/contact" className="hover:text-white">Contact Form</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 md:pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 GrenadaSearch.com - All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  )
}