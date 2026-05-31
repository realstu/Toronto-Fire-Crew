'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeftRight, Plus, Calendar, MapPin, CheckCircle } from 'lucide-react'

const PLATOONS = ['A Platoon', 'B Platoon', 'C Platoon', 'D Platoon']

export default function ShiftsPage() {
  const router = useRouter()
  const [shifts, setShifts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ shift_date: '', platoon: 'A Platoon', station: '', notes: '' })

  async function load() {
    const supabase = createClient()
    const { data } = await supabase.from('tfc_shifts').select('*').order('shift_date', { ascending: true })
    setShifts(data || [])
    setLoading(false)
  }

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/login')
    })
    load()
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('tfc_shifts').insert({
      shift_date: form.shift_date,
      platoon: form.platoon,
      station: form.station,
      notes: form.notes,
      posted_by_id: user?.id,
      posted_by_name: user?.user_metadata?.full_name || 'Member',
      status: 'open',
    })
    setForm({ shift_date: '', platoon: 'A Platoon', station: '', notes: '' })
    setShowNew(false)
    setSubmitting(false)
    load()
  }

  async function claimShift(id: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('tfc_shifts').update({
      status: 'claimed',
      claimed_by_id: user?.id,
      claimed_by_name: user?.user_metadata?.full_name || 'Member',
    }).eq('id', id)
    load()
  }

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-10 w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/10 border border-orange-500/20 text-orange-400 w-10 h-10 rounded-xl flex items-center justify-center">
              <ArrowLeftRight size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">Shift Swaps</h1>
              <p className="text-slate-500 text-sm">Post a shift you need covered or pick one up.</p>
            </div>
          </div>
          <button onClick={() => setShowNew(!showNew)}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors">
            <Plus size={15} /> Post Shift
          </button>
        </div>

        {showNew && (
          <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 mb-6 space-y-4">
            <h2 className="font-bold text-white">Post a Shift</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Shift Date</label>
                <input type="date" required value={form.shift_date} onChange={e => setForm({ ...form, shift_date: e.target.value })}
                  className="w-full bg-slate-900 border border-white/[0.08] focus:border-orange-500/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Platoon</label>
                <select value={form.platoon} onChange={e => setForm({ ...form, platoon: e.target.value })}
                  className="w-full bg-slate-900 border border-white/[0.08] focus:border-orange-500/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors">
                  {PLATOONS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Station</label>
                <input required value={form.station} onChange={e => setForm({ ...form, station: e.target.value })}
                  placeholder="e.g. Station 312"
                  className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-orange-500/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Notes <span className="text-slate-600">(optional)</span></label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                  rows={2} placeholder="Any details about the swap..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-orange-500/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors resize-none placeholder:text-slate-600" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={submitting}
                className="bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-bold py-2 px-5 rounded-xl transition-colors text-sm">
                {submitting ? 'Posting...' : 'Post Shift'}
              </button>
              <button type="button" onClick={() => setShowNew(false)}
                className="text-slate-500 hover:text-white text-sm px-3 py-2 rounded-xl transition-colors">
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {loading ? (
            <div className="text-slate-600 text-sm text-center py-10">Loading...</div>
          ) : shifts.length === 0 ? (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-10 text-center">
              <ArrowLeftRight size={32} className="text-slate-700 mx-auto mb-3" />
              <p className="text-slate-600 text-sm">No shifts posted yet.</p>
            </div>
          ) : (
            shifts.map((shift) => (
              <div key={shift.id} className={`bg-white/[0.03] border rounded-2xl p-5 ${shift.status === 'claimed' ? 'border-white/[0.04] opacity-60' : 'border-white/[0.07]'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-semibold bg-orange-500/10 border border-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">{shift.platoon}</span>
                      {shift.status === 'claimed' && (
                        <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                          <CheckCircle size={11} /> Claimed
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-white font-semibold text-sm mb-1">
                      <Calendar size={13} className="text-slate-500" />
                      {new Date(shift.shift_date + 'T12:00:00').toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-sm mb-1">
                      <MapPin size={13} className="text-slate-500" /> {shift.station}
                    </div>
                    {shift.notes && <p className="text-slate-500 text-xs mt-1">{shift.notes}</p>}
                    <p className="text-slate-600 text-xs mt-2">Posted by {shift.posted_by_name}</p>
                    {shift.status === 'claimed' && shift.claimed_by_name && (
                      <p className="text-slate-600 text-xs">Picked up by {shift.claimed_by_name}</p>
                    )}
                  </div>
                  {shift.status === 'open' && (
                    <button onClick={() => claimShift(shift.id)}
                      className="shrink-0 bg-red-600/10 hover:bg-red-600/20 border border-red-600/20 text-red-400 font-semibold text-xs px-3 py-2 rounded-lg transition-colors">
                      I&apos;ll take it
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  )
}
