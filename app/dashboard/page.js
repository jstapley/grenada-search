'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/lib/AuthContext'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [claimedListings, setClaimedListings] = useState([])
  const [loadingListings, setLoadingListings] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [upgradingId, setUpgradingId] = useState(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      checkAdminStatus()
      loadClaimedListings()
    }
  }, [user])

  const checkAdminStatus = async () => {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    setIsAdmin(profile?.role === 'admin')
  }

  const loadClaimedListings = async () => {
    const { data } = await supabase
      .from('claimed_listings')
      .select(`
        *,
        listing:listings(
          id, business_name, slug, short_description, address, status, featured,
          category:categories(name, icon),
          parish:parishes(name)
        )
      `)
      .eq('user_id', user.id)
    setClaimedListings(data || [])
    setLoadingListings(false)
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const handleUpgrade = async (listing) => {
    setUpgradingId(listing.id)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing.id,
          listingName: listing.business_name,
          userEmail: user.email,
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      window.location.href = data.url
    } catch (err) {
      alert('Could not start checkout: ' + err.message)
      setUpgradingId(null)
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-[#007A5E] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/grenada-flag.png" alt="Grenada Flag" width={50} height={50} className="rounded-full" />
              <div>
                <div className="text-xl font-bold text-gray-900">GRENADA</div>
                <div className="text-sm text-[#007A5E] font-semibold">GRENADA SEARCH</div>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              {isAdmin && (
                <span className="bg-[#E8F5F1] text-[#007A5E] px-3 py-1 rounded-full text-sm font-semibold">
                  Admin
                </span>
              )}
              <Link href="/" className="text-gray-700 hover:text-[#007A5E] font-medium">
                View Directory
              </Link>
              <button onClick={handleSignOut} className="text-gray-700 hover:text-[#CE1126] font-medium">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome back! 👋</h1>
          <p className="text-lg text-gray-600">Manage your business listings and reach more customers</p>
        </div>

        {/* Quick Actions */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${isAdmin ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 mb-12`}>
          <Link
            href="/dashboard/claim-listing"
            className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#007A5E] hover:shadow-lg transition group"
          >
            <div className="text-4xl mb-3">🏢</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#007A5E]">Claim a Listing</h3>
            <p className="text-gray-600">Already listed? Claim your business to manage it</p>
          </Link>

          <Link
            href="/add-listing"
            className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#007A5E] hover:shadow-lg transition group"
          >
            <div className="text-4xl mb-3">➕</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#007A5E]">Add New Listing</h3>
            <p className="text-gray-600">List a new business in the directory</p>
          </Link>

          {isAdmin && (
            <>
              <Link
                href="/dashboard/import"
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#007A5E] hover:shadow-lg transition group"
              >
                <div className="text-4xl mb-3">📤</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#007A5E]">Import from CSV</h3>
                <p className="text-gray-600">Bulk upload multiple businesses at once</p>
              </Link>

              <Link
                href="/dashboard/admin"
                className="bg-white border-2 border-[#CE1126]/30 rounded-xl p-6 hover:border-[#CE1126] hover:shadow-lg transition group"
              >
                <div className="text-4xl mb-3">🛡️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#CE1126]">Admin Panel</h3>
                <p className="text-gray-600">Manage all listings, users, and claims</p>
              </Link>
            </>
          )}

          <Link
            href="/pricing"
            className="bg-[#007A5E] rounded-xl p-6 text-white hover:bg-[#005F48] transition"
          >
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="text-xl font-bold mb-2">Go Featured</h3>
            <p className="text-white/90">Get premium placement and more visibility</p>
          </Link>
        </div>

        {/* My Listings */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">My Listings</h2>

          {loadingListings ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading your listings...</p>
            </div>
          ) : claimedListings.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
              <div className="text-6xl mb-4">🏝️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Listings Yet</h3>
              <p className="text-gray-600 mb-6">Claim an existing listing or add a new business to get started</p>
              <div className="flex gap-4 justify-center">
                <Link href="/dashboard/claim-listing" className="bg-[#007A5E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005F48] transition">
                  Claim a Listing
                </Link>
                <Link href="/add-listing" className="bg-white border-2 border-[#007A5E] text-[#007A5E] px-6 py-3 rounded-lg font-semibold hover:bg-[#F0FAF7] transition">
                  Add New Listing
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {claimedListings.map((claim) => {
                if (!claim.listing) return null
                const listing = claim.listing
                return (
                  <div key={claim.id} className={`bg-white border-2 rounded-xl overflow-hidden hover:shadow-lg transition ${
                    listing.featured ? 'border-[#FCD116]' : 'border-gray-200'
                  }`}>
                    <div className="relative aspect-video bg-[#E8F5F1] flex items-center justify-center">
                      <span className="text-6xl">{listing.category?.icon || '🏢'}</span>
                      {listing.featured && (
                        <div className="absolute top-2 right-2 bg-[#FCD116] text-[#1a1a1a] px-2 py-1 rounded-full text-xs font-bold">
                          ⭐ Featured
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {listing.business_name || 'Unnamed Business'}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          listing.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-[#FEF9E0] text-[#c9a800]'
                        }`}>
                          {listing.status || 'unknown'}
                        </span>
                      </div>
                      {listing.parish && (
                        <p className="text-sm text-gray-600 mb-3">📍 {listing.parish.name}</p>
                      )}
                      <div className="flex gap-2 mb-3">
                        <Link
                          href={`/listing/${listing.slug}`}
                          className="flex-1 text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
                        >
                          View
                        </Link>
                        <Link
                          href={`/dashboard/edit/${listing.id}`}
                          className="flex-1 text-center bg-[#007A5E] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#005F48] transition"
                        >
                          Edit
                        </Link>
                      </div>
                      {!listing.featured && (
                        <button
                          onClick={() => handleUpgrade(listing)}
                          disabled={upgradingId === listing.id}
                          className="w-full bg-[#FCD116] text-[#1a1a1a] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#e0bc10] disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                        >
                          {upgradingId === listing.id ? '⏳ Redirecting...' : '⭐ Upgrade to Featured — EC$350/yr'}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}