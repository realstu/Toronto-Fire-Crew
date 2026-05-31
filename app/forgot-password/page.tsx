'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Flame } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `https://toronto-fire-crew.vercel.app/auth/callback?next=/update-password`,
    })
    if (error) {
      setError('Something went wrong. Check the email address and try again.')
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 font-bold text-xl text-white mb-2">
            <div className="bg-red-600 text-white rounded-lg p-1.5">
              <Flame size={18} />
            </div>
            Toronto Fire Crew
          </div>
          <p className="text-slate-500 text-sm">Reset your password.</p>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 space-y-4">
          {sent ? (
            <div className="text-center space-y-3">
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm px-4 py-3 rounded-xl">
                Check your email — a reset link is on its way.
              </div>
              <p className="text-slate-500 text-xs">Didn't get it? Check spam or try again.</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-2.5 rounded-xl">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-red-600/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-400 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-slate-600 text-sm mt-5">
          <Link href="/login" className="text-red-400 hover:underline">Back to sign in</Link>
        </p>
      </div>
    </main>
  )
}
