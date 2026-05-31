'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Flame, CheckCircle, ArrowRight } from 'lucide-react'

export default function RequestAccessPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', badge: '', station: '', notes: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent('Toronto Fire Crew — Access Request')
    const body = encodeURIComponent(
      `New access request:\n\nName: ${form.name}\nEmail: ${form.email}\nBadge #: ${form.badge}\nStation: ${form.station}\nNotes: ${form.notes || 'None'}`
    )
    window.location.href = `mailto:stuartoggrealtor@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 font-bold text-xl text-white mb-2">
            <div className="bg-red-600 text-white rounded-lg p-1.5">
              <Flame size={18} />
            </div>
            Toronto Fire Crew
          </div>
          <p className="text-slate-500 text-sm">Request access — admin approval required.</p>
        </div>

        {submitted ? (
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-10 text-center">
            <CheckCircle size={48} className="text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Request Sent</h3>
            <p className="text-slate-500 text-sm">Your request has been submitted. You&apos;ll receive an invite by email once approved.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-white text-lg mb-1">Apply for Access</h2>
            <p className="text-slate-500 text-sm mb-4">All requests are reviewed manually. You&apos;ll need to provide your badge number for verification.</p>

            {[
              { name: 'name', label: 'Full Name', placeholder: 'Jane Smith' },
              { name: 'email', label: 'Email Address', placeholder: 'you@email.com' },
              { name: 'badge', label: 'Badge / Employee Number', placeholder: 'e.g. 4821' },
              { name: 'station', label: 'Station', placeholder: 'e.g. Station 312' },
            ].map(field => (
              <div key={field.name}>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">{field.label}</label>
                <input name={field.name} required value={form[field.name as keyof typeof form]}
                  onChange={handleChange} placeholder={field.placeholder}
                  className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-red-600/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600" />
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Anything else <span className="text-slate-600">(optional)</span></label>
              <textarea name="notes" value={form.notes} onChange={handleChange}
                placeholder="Who referred you? Any other context..."
                rows={3}
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-red-600/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 resize-none" />
            </div>
            <button type="submit"
              className="w-full bg-red-600 hover:bg-red-400 text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
              Submit Request <ArrowRight size={15} />
            </button>
          </form>
        )}

        <p className="text-center text-slate-600 text-sm mt-5">
          Already have access?{' '}
          <Link href="/login" className="text-red-400 hover:underline">Sign in</Link>
        </p>
      </div>
    </main>
  )
}
