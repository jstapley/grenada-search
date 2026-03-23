'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/lib/AuthContext'

export default function PricingClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [businessCount, setBusinessCount] = useState('1,000+')
  const { user } = useAuth()

  useEffect(() => {
    fetch('/api/business-count')
      .then(res => res.json())
      .then(data => {
        if (data.display) setBusinessCount(data.display)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-white">
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
              <Link href="/blog" className="text-gray-700 hover:text-[#007A5E] font-medium">Blog</Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#007A5E] font-medium">Contact</Link>
              {user ? (
                <Link href="/dashboard" className="text-gray-700 hover:text-[#007A5E] font-medium">Dashboard</Link>
              ) : (
                <Link href="/login" className="text-gray-700 hover:text-[#007A5E] font-medium">Login</Link>
              )}
              <Link href="/add-listing" className="bg-[#007A5E] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#005F48] transition">+ Add Your Business</Link>
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
              <Link href="/blog" className="block text-gray-700 hover:text-[#007A5E] font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
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

      {/* Hero */}
      <section className="bg-[#007A5E] py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl md:text-2xl text-[#FCD116] font-bold mb-3">Free forever. Go Featured when you're ready.</p>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Join {businessCount} businesses already listed on Grenada&apos;s premier business directory
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-gradient-to-b from-[#F0FAF7] to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">

            {/* Free Plan */}
            <div className="bg-gradient-to-br from-[#007A5E] to-[#004A38] border-4 border-green-400 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
              <div className="text-center mb-6">
                <div className="inline-block bg-green-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">100% FREE FOREVER</div>
                <h2 className="text-3xl font-black text-white mb-3">Complete Business Profile</h2>
                <p className="text-3xl text-white font-bold mb-2">$0<span className="text-lg">/month</span></p>
                <p className="text-white/90 text-sm">Everything you need to showcase your business</p>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  ['Complete Business Profile', 'Business name, category, location, and description'],
                  ['Contact Information', 'Phone, email, and physical address'],
                  ['Website & Social Links', 'Link to your website, Facebook, Instagram, and more'],
                  ['Photo Gallery', 'Showcase your business with multiple photos'],
                  ['Customer Reviews & Ratings', 'Build trust with verified reviews'],
                  ['Mobile-Friendly Design', 'Looks great on all devices'],
                ].map(([title, desc]) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="text-green-400 text-xl flex-shrink-0">✓</div>
                    <div>
                      <h3 className="text-white font-bold">{title}</h3>
                      <p className="text-white/80 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Link href="/add-listing" className="block bg-[#FCD116] hover:bg-[#e0bc10] text-[#1a1a1a] font-black text-lg px-8 py-4 rounded-xl transition shadow-lg">
                  Add Your Business Now →
                </Link>
                <p className="text-white/70 mt-3 text-xs">No credit card required • Takes less than 5 minutes</p>
              </div>
            </div>

            {/* Featured Plan */}
            <div className="relative bg-gradient-to-br from-[#007A5E] to-[#004A38] border-4 border-[#FCD116] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
              <div className="absolute -top-4 right-4 bg-[#CE1126] text-white px-4 py-1.5 rounded-full text-xs font-bold">
                🔥 First 20 Only
              </div>
              <div className="text-center mb-6">
                <div className="inline-block bg-[#FCD116] text-[#1a1a1a] px-6 py-2 rounded-full font-bold text-sm mb-4">FEATURED LISTING</div>
                <h2 className="text-3xl font-black text-white mb-3">Premium Placement</h2>
                <p className="text-3xl text-white font-bold mb-1">EC$350<span className="text-lg">/year</span></p>
                <p className="text-white/80 text-sm mb-2">Less than EC$1 per day</p>
                <p className="text-white/90 text-sm">Stand out from the competition with premium visibility</p>
              </div>
              <div className="mb-4">
                <h3 className="text-white font-bold text-center mb-3">Everything in Free, plus:</h3>
                <div className="space-y-3">
                  {[
                    ['Gold border & star badge', 'Stand out with premium styling across the directory'],
                    ['Top of category results', 'Appear first when customers browse your category'],
                    ['Homepage featured section', 'Maximum visibility — seen by every visitor'],
                    ['Priority placement', 'Always listed first in search results'],
                    ['Annual renewal reminder', "We'll remind you before your listing expires"],
                  ].map(([title, desc]) => (
                    <div key={title} className="flex items-start gap-3">
                      <div className="text-[#FCD116] text-xl flex-shrink-0">⭐</div>
                      <div>
                        <h3 className="text-white font-bold">{title}</h3>
                        <p className="text-white/80 text-sm">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center mt-6">
                {user ? (
                  <Link href="/dashboard" className="block bg-[#FCD116] hover:bg-[#e0bc10] text-[#1a1a1a] font-black text-lg px-8 py-4 rounded-xl transition shadow-lg">
                    Get Featured Now — EC$350/yr →
                  </Link>
                ) : (
                  <Link href="/login" className="block bg-[#FCD116] hover:bg-[#e0bc10] text-[#1a1a1a] font-black text-lg px-8 py-4 rounded-xl transition shadow-lg">
                    Get Featured Now — EC$350/yr →
                  </Link>
                )}
                <p className="text-white/70 mt-3 text-xs">Login to your listing to upgrade • Secure payment via Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Get Featured */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-4">How to Get Featured</h2>
          <p className="text-gray-600 text-center mb-10">Three simple steps to premium placement</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              ['1', '🏢', 'Claim Your Listing', 'Sign up and claim your existing business listing on GrenadaSearch.com'],
              ['2', '⭐', 'Click Upgrade', 'Find the "Upgrade to Featured" button on your listing page or dashboard'],
              ['3', '💳', 'Pay Securely', 'Complete your EC$350/year payment via Stripe and go live instantly'],
            ].map(([step, icon, title, desc]) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 bg-[#007A5E] text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">
                  {step}
                </div>
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/dashboard/claim-listing" className="inline-block bg-[#007A5E] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#005F48] transition">
              Claim Your Business →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['Is it really free?', 'Yes! Creating a complete business profile on GrenadaSearch.com is 100% free with no hidden costs.'],
              ['Do I need a credit card?', 'No credit card required for the free listing. Simply fill out the form and you\'re done!'],
              ['How long to get listed?', 'Most listings are reviewed and published within 24-48 hours of submission.'],
              ['Can I update my listing?', 'Absolutely! Claim your listing and update your information anytime from your dashboard.'],
              ['How does Featured work?', 'Pay EC$350/year via Stripe and your listing instantly gets a gold border, top placement, and homepage visibility.'],
              ['Will my listing stay free?', 'Yes! Your basic listing will always remain free. Featured is an optional upgrade for more visibility.'],
            ].map(([q, a]) => (
              <div key={q} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#007A5E] transition">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-600 text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/grenada-flag.png" alt="Grenada Flag" width={40} height={40} className="rounded-full" />
                <div>
                  <div className="font-bold">Grenada Search</div>
                  <div className="text-sm text-gray-400">Directory</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Your complete guide to Grenada — the Spice Isle of the Caribbean</p>
            </div>
            <div>
              <h6 className="font-bold mb-4">Quick Links</h6>
              <div className="space-y-2 text-sm">
                <Link href="/" className="block text-gray-400 hover:text-white transition">Home</Link>
                <Link href="/parishes" className="block text-gray-400 hover:text-white transition">Browse Parishes</Link>
                <Link href="/categories" className="block text-gray-400 hover:text-white transition">All Categories</Link>
                <Link href="/about" className="block text-gray-400 hover:text-white transition">About Us</Link>
                <Link href="/blog" className="block text-gray-400 hover:text-white transition">Blog</Link>
              </div>
            </div>
            <div>
              <h6 className="font-bold mb-4">For Business</h6>
              <div className="space-y-2 text-sm">
                <Link href="/add-listing" className="block text-gray-400 hover:text-white transition">List Your Business</Link>
                <Link href="/advertise" className="block text-gray-400 hover:text-white transition">Advertise With Us</Link>
                <Link href="/pricing" className="block text-gray-400 hover:text-white transition">Pricing</Link>
              </div>
            </div>
            <div>
              <h6 className="font-bold mb-4">Websites</h6>
              <div className="space-y-2 text-sm">
                <a href="https://www.grenadasearch.com" className="block text-gray-400 hover:text-white transition">GrenadaSearch.com</a>
                <a href="https://www.antiguasearch.com" className="block text-gray-400 hover:text-white transition">AntiguaSearch.com</a>
                <a href="https://www.stapleyinc.com" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition">StapleyInc.com</a>
                <a href="https://www.antiguamarinesolutions.com" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition">AntiguaMarineSolutions.com</a>
              </div>
            </div>
            <div>
              <h6 className="font-bold mb-4">Contact</h6>
              <p className="text-gray-400 text-sm mb-2">contact@grenadasearch.com</p>
              <p className="text-gray-400 text-sm">St. George&apos;s, Grenada</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2026 GrenadaSearch.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}