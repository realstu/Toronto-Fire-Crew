'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus } from 'lucide-react'

export default function CreateAnnouncementForm() {
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ title: '', body: '', pinned: false })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const supabase = createClient()
    await supabase.from('tfc_announcements').insert({
      title: form.title,
      body: form.body,
      pinned: form.pinned,
    })
    setForm({ title: '', body: '', pinned: false })
    setShow(false)
    setSubmitting(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold">Post Announcement</h2>
        <button
          onClick={() => setShow(!show)}
          className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={15} /> New Announcement
        </button>
      </div>

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm px-4 py-3 rounded-xl mb-4">
          Announcement posted successfully.
        </div>
      )}

      {show && (
        <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Title</label>
            <input
              required
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Announcement title"
              className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-orange-500/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Message</label>
            <textarea
              required
              value={form.body}
              onChange={e => setForm({ ...form, body: e.target.value })}
              rows={4}
              placeholder="Write your announcement..."
              className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-orange-500/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors resize-none placeholder:text-slate-600"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.pinned}
              onChange={e => setForm({ ...form, pinned: e.target.checked })}
              className="w-4 h-4 accent-orange-500"
            />
            <span className="text-sm text-slate-400">Pin this announcement</span>
          </label>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-bold py-2 px-5 rounded-xl transition-colors text-sm"
            >
              {submitting ? 'Posting...' : 'Post'}
            </button>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="text-slate-500 hover:text-white text-sm px-3 py-2 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
