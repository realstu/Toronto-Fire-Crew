'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/client'
import { MessageSquare, Plus, ChevronRight } from 'lucide-react'

const CATEGORIES = ['General', 'On the Job', 'Off the Job', 'Health & Wellness', 'Equipment', 'Schedules']

export default function ForumPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ title: '', category: 'General', body: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/login')
    })
    supabase.from('tfc_posts').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setPosts(data || [])
      setLoading(false)
    })
  }, [router])

  async function handlePost(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('tfc_posts').insert({
      title: form.title,
      category: form.category,
      body: form.body,
      author_id: user?.id,
      author_name: user?.user_metadata?.full_name || 'Member',
    })
    setForm({ title: '', category: 'General', body: '' })
    setShowNew(false)
    setSubmitting(false)
    const { data } = await supabase.from('tfc_posts').select('*').order('created_at', { ascending: false })
    setPosts(data || [])
  }

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-10 w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-red-600/10 border border-red-600/20 text-red-400 w-10 h-10 rounded-xl flex items-center justify-center">
              <MessageSquare size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">Forum</h1>
              <p className="text-slate-500 text-sm">Member discussions.</p>
            </div>
          </div>
          <button onClick={() => setShowNew(!showNew)}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-400 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors">
            <Plus size={15} /> New Post
          </button>
        </div>

        {showNew && (
          <form onSubmit={handlePost} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 mb-6 space-y-4">
            <h2 className="font-bold text-white">New Post</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Title</label>
                <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Post title"
                  className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-red-600/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-slate-900 border border-white/[0.08] focus:border-red-600/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Message</label>
              <textarea required value={form.body} onChange={e => setForm({ ...form, body: e.target.value })}
                rows={4} placeholder="What's on your mind?"
                className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-red-600/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors resize-none placeholder:text-slate-600" />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={submitting}
                className="bg-red-600 hover:bg-red-400 disabled:opacity-60 text-white font-bold py-2 px-5 rounded-xl transition-colors text-sm">
                {submitting ? 'Posting...' : 'Post'}
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
          ) : posts.length === 0 ? (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-10 text-center">
              <MessageSquare size={32} className="text-slate-700 mx-auto mb-3" />
              <p className="text-slate-600 text-sm">No posts yet. Be the first to start a discussion.</p>
            </div>
          ) : (
            posts.map((post) => (
              <Link key={post.id} href={`/forum/${post.id}`}
                className="group flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.07] hover:border-white/[0.12] rounded-2xl p-5 transition-all">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium bg-white/[0.05] text-slate-400 px-2 py-0.5 rounded-full">{post.category}</span>
                  </div>
                  <div className="font-semibold text-white text-sm truncate">{post.title}</div>
                  <div className="text-slate-600 text-xs mt-1">{post.author_name} · {new Date(post.created_at).toLocaleDateString('en-CA')}</div>
                </div>
                <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 shrink-0 ml-3 transition-colors" />
              </Link>
            ))
          )}
        </div>
      </main>
    </>
  )
}
