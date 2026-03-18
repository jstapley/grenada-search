import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 300

export const metadata = {
  title: 'Advertise With Us | GrenadaSearch.com',
  description: 'Reach thousands of tourists and locals searching for businesses in Grenada. Advertise your business on the premier directory platform for the Spice Isle.',
  keywords: 'advertise grenada, business advertising grenada, tourism advertising, grenada marketing, business promotion spice isle'
}

async function getBusinessCount(): Promise<string> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/business-count`, {
      next: { revalidate: 300 }
    })
    const data = await res.json()
    return data.display ?? '200'
  } catch {
    return '200'
  }
}

export default async function AdvertisePage() {
  const businessCount = await getBusinessCount()

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-[#007A5E] text-white py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-center md:text-left">
              <span className="text-2xl">📊</span>
              <div>
                <span className="font-bold text-lg md:text-xl">1247 people</span>
                <span className="text-sm md:text-base ml-1">browsing this month</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-center">
              <span className="text-xl">🏪</span>
              <span className="text-sm md:text-base">Own a business?</span>
              <Link href="/advertise" className="text-[#FCD116] font-semibold underline hover:text-[#e0bc10] text-sm md:text-base whitespace-nowrap">
                Advertise Your Business
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
              <Link href="/categories" className="text-gray-700 hover:text-[#007A5E] font-medium">Categories</Link>
              <Link href="/about" className="text-gray-700 hover:text-[#007A5E] font-medium">About Us</Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#007A5E] font-medium">Contact</Link>
              <Link href="/login" className="text-gray-700 hover:text-[#007A5E] font-medium">Login</Link>
              <Link href="/add-listing" className="bg-[#007A5E] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#005F48] transition">
                + Add Your Business
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#007A5E] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Advertise Your Business
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-[#FCD116] mb-6">
            Reach Thousands of Potential Customers
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Connect with tourists and locals actively searching for businesses like yours in Grenada — the Spice Isle of the Caribbean
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="bg-[#FCD116] text-[#1a1a1a] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#e0bc10] transition shadow-lg">
              View Pricing Plans →
            </Link>
            <Link href="/contact" className="bg-white/20 text-white px-10 py-4 rounded-xl font-bold text-lg border-2 border-white/50 hover:bg-white/30 transition">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border-2 border-[#B3DDD4]">
              <div className="text-5xl font-extrabold text-[#007A5E] mb-2">1,200+</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Monthly Visitors</div>
              <div className="text-gray-600">Actively searching for businesses</div>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border-2 border-[#B3DDD4]">
              <div className="text-5xl font-extrabold text-[#007A5E] mb-2">{businessCount}</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Business Listings</div>
              <div className="text-gray-600">Across all categories &amp; parishes</div>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg border-2 border-[#B3DDD4]">
              <div className="text-5xl font-extrabold text-[#007A5E] mb-2">7</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Parishes Covered</div>
              <div className="text-gray-600">Including Carriacou &amp; Petite Martinique</div>
            </div>
          </div>
        </div>
      </section>

      {/* Advertising Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Advertising Options</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect package to showcase your business to potential customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Featured Listings */}
            <div className="bg-[#007A5E] rounded-3xl p-8 text-white border-4 border-[#FCD116] shadow-2xl">
              <div className="text-center mb-6">
                <div className="inline-block bg-[#FCD116] text-[#1a1a1a] px-6 py-2 rounded-full font-bold text-sm mb-4">
                  MOST POPULAR
                </div>
                <h3 className="text-3xl font-black mb-3">Featured Business Listing</h3>
                <div className="text-4xl font-black mb-2">$25<span className="text-xl">/month</span></div>
                <p className="text-white/90">Stand out from the competition</p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Gold border & star badge on your listing',
                  'Top placement in category search results',
                  'Featured on homepage rotation',
                  'Priority placement in all search results',
                  'Enhanced listing with full details',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#FCD116] text-xl flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact?subject=Featured Listing Inquiry" className="block w-full bg-[#FCD116] hover:bg-[#e0bc10] text-[#1a1a1a] text-center py-4 rounded-xl font-black text-lg transition">
                Get Early Access →
              </Link>
            </div>

            {/* Display Advertising */}
            <div className="bg-white rounded-3xl p-8 border-4 border-gray-200 shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-block bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-bold text-sm mb-4">
                  COMING SOON
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-3">Display Advertising</h3>
                <div className="text-4xl font-black text-[#007A5E] mb-2">Custom</div>
                <p className="text-gray-600">High-visibility banner ads</p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Homepage banner placement',
                  'Category page sidebar ads',
                  'Custom ad design & placement',
                  'Detailed performance analytics',
                  'Flexible campaign durations',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#007A5E] text-xl flex-shrink-0">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="block w-full bg-[#007A5E] hover:bg-[#005F48] text-white text-center py-4 rounded-xl font-black text-lg transition">
                Contact for Pricing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Advertise */}
      <section className="py-20 bg-gradient-to-b from-[#F0FAF7] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Why Advertise on GrenadaSearch.com?
            </h2>
            <p className="text-xl text-gray-600">
              The premier platform for reaching tourists and locals in Grenada
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: '🎯', title: 'Targeted Audience', body: 'Reach customers actively searching for businesses in your category and location' },
              { emoji: '📈', title: 'Growing Traffic', body: 'Our visitor count is growing monthly as we become the go-to directory for Grenada' },
              { emoji: '💰', title: 'Affordable Pricing', body: 'Get premium visibility without breaking the bank — starting at just $25/month' },
              { emoji: '🌿', title: 'Tourism Focused', body: 'Perfect for hotels, restaurants, tours, and any business targeting visitors to the Spice Isle' },
              { emoji: '📱', title: 'Mobile Optimized', body: 'Your ads look great on all devices — desktop, tablet, and mobile' },
              { emoji: '⚡', title: 'Quick Setup', body: 'Get your featured listing live in minutes — no complicated setup required' },
            ].map(({ emoji, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-8 shadow-lg hover:border-2 hover:border-[#007A5E] transition">
                <div className="text-5xl mb-4">{emoji}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#007A5E] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join {businessCount} businesses already listed on GrenadaSearch.com
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?subject=Featured Listing Inquiry" className="bg-[#FCD116] hover:bg-[#e0bc10] text-[#1a1a1a] px-12 py-5 rounded-xl font-black text-xl transition shadow-2xl">
              Get Early Access
            </Link>
            <Link href="/contact" className="bg-white/20 hover:bg-white/30 text-white px-12 py-5 rounded-xl font-black text-xl border-2 border-white transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2026 GrenadaSearch.com. All rights reserved.</p>
            <p className="text-gray-500 text-xs mt-2">{businessCount} Business Listings • 7 Parishes • Discover the Spice Isle</p>
          </div>
        </div>
      </footer>
    </div>
  )
}