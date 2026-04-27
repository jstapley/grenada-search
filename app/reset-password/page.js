'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [validSession, setValidSession] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    // Supabase automatically handles the token from the URL
    // We just need to check if we have a valid session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setValidSession(true)
      }
      setCheckingSession(false)
    }

    // Listen for auth state change when token is processed
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setValidSession(true)
        setCheckingSession(false)
      }
    })

    checkSession()

    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({ password })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-[#007A5E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/grenada-flag.png" alt="Grenada Flag" width={50} height={50} className="rounded-full" />
            <div>
              <div className="text-xl font-bold text-gray-900">GRENADA</div>
              <div className="text-sm text-[#007A5E] font-semibold">GRENADA SEARCH</div>
            </div>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          {checkingSession ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">⏳</div>
              <p className="text-gray-600">Verifying reset link...</p>
            </div>
          ) : !validSession ? (
            <div className="text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-4">Link Expired</h1>
              <p className="text-gray-600 mb-6">
                This password reset link has expired or is invalid. Please request a new one.
              </p>
              <Link
                href="/forgot-password"
                className="inline-block bg-[#007A5E] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#005F48] transition"
              >
                Request New Link
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="text-4xl mb-3">🔐</div>
                <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Set New Password</h1>
                <p className="text-gray-600">
                  Choose a strong password for your GrenadaSearch account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Minimum 8 characters"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#007A5E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Repeat your new password"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#007A5E] focus:outline-none"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#007A5E] text-white py-3 rounded-lg font-bold hover:bg-[#005F48] disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}