'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/client'
import { User } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const [pseudonym, setPseudonym] = useState('')
  const [current, setCurrent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('tfc_profiles').select('pseudonym').eq('id', user.id).single()
      if (data) { setPseudonym(data.pseudonym); setCurrent(data.pseudonym) }
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

    const { error } = await supabase.from('tfc_profiles').update({ pseudonym: pseudonym.trim() }).eq('id', user.id)
    if (error) {
      setError('Something went wrong. Try again.')
    } else {
      setCurrent(pseudonym.trim())
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setSubmitting(false)
  }

  return (
    <>
      <Navbar />
      <main className="max-w-lg mx-auto px-4 py-10 w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-red-600/10 border border-red-600/20 text-red-400 w-10 h-10 rounded-xl flex items-center justify-center">
            <User size={18} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Your Profile</h1>
            <p className="text-slate-500 text-sm">Manage your pseudonym and display name.</p>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 space-y-4">
          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm px-4 py-2.5 rounded-xl">
              Pseudonym updated to <strong>{current}</strong>.
            </div>
          )}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-2.5 rounded-xl">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Pseudonym</label>
              <input
                required
                value={pseudonym}
                onChange={e => setPseudonym(e.target.value)}
                maxLength={30}
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-red-600/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors"
              />
              <p className="text-slate-600 text-xs mt-1.5">This is how other members see you. Your real name stays private.</p>
            </div>
            <button
              type="submit"
              disabled={submitting || pseudonym.trim() === current}
              className="bg-red-600 hover:bg-red-400 disabled:opacity-60 text-white font-bold py-2.5 px-6 rounded-xl transition-colors text-sm"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </main>
    </>
  )
}
