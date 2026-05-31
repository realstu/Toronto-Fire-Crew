'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Flame, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ProfileSetupPage() {
  const router = useRouter()
  const [pseudonym, setPseudonym] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/login')
    })
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!pseudonym.trim()) return
    setSubmitting(true)
    setError('')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('tfc_profiles').insert({
      id: user.id,
      pseudonym: pseudonym.trim(),
    })

    if (error) {
      setError('That name may already be taken. Try another.')
      setSubmitting(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 font-bold text-xl text-white mb-3">
            <div className="bg-red-600 text-white rounded-lg p-1.5">
              <Flame size={18} />
            </div>
            Toronto Fire Crew
          </div>
          <h1 className="text-white font-extrabold text-2xl mb-2">Choose your name</h1>
          <p className="text-slate-500 text-sm">Pick a pseudonym. This is how other members will see you — your real name stays private.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-2.5 rounded-xl">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Your pseudonym</label>
            <div className="relative">
              <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                required
                value={pseudonym}
                onChange={e => setPseudonym(e.target.value)}
                placeholder="e.g. Station12, TruckCo4, Probie..."
                maxLength={30}
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-red-600/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600"
              />
            </div>
            <p className="text-slate-600 text-xs mt-1.5">Max 30 characters. You can change this later.</p>
          </div>
          <button
            type="submit"
            disabled={submitting || !pseudonym.trim()}
            className="w-full bg-red-600 hover:bg-red-400 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors text-sm"
          >
            {submitting ? 'Saving...' : 'Set My Name →'}
          </button>
        </form>
      </div>
    </main>
  )
}
