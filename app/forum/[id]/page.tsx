'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { createClient } from '@/lib/supabase/client'
import { MessageSquare, ArrowLeft, Send } from 'lucide-react'

export default function ForumPostPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<any>(null)
  const [replies, setReplies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  async function load() {
    const supabase = createClient()
    const [{ data: postData }, { data: replyData }] = await Promise.all([
      supabase.from('tfc_posts').select('*').eq('id', id).single(),
      supabase.from('tfc_replies').select('*').eq('post_id', id).order('created_at', { ascending: true }),
    ])
    setPost(postData)
    setReplies(replyData || [])
    setLoading(false)
  }

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/login'); return }
      setCurrentUser(user)
    })
    load()
  }, [id, router])

  async function handleReply(e: React.FormEvent) {
    e.preventDefault()
    if (!body.trim()) return
    setSubmitting(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('tfc_replies').insert({
      post_id: id,
      body: body.trim(),
      author_id: user?.id,
      author_name: user?.user_metadata?.full_name || 'Member',
    })
    setBody('')
    setSubmitting(false)
    load()
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-10">
          <div className="text-slate-600 text-sm text-center py-20">Loading...</div>
        </main>
      </>
    )
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-10">
          <div className="text-slate-600 text-sm text-center py-20">Post not found.</div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-10 w-full">
        <Link href="/forum" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft size={14} /> Back to Forum
        </Link>

        {/* Original post */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium bg-white/[0.05] text-slate-400 px-2 py-0.5 rounded-full">{post.category}</span>
          </div>
          <h1 className="text-xl font-extrabold text-white mb-3">{post.title}</h1>
          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{post.body}</p>
          <p className="text-slate-600 text-xs mt-4">{post.author_name} · {new Date(post.created_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Replies */}
        <div className="mb-6">
          <h2 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
            <MessageSquare size={14} className="text-slate-500" />
            {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
          </h2>
          <div className="space-y-3">
            {replies.map((r) => (
              <div key={r.id} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{r.body}</p>
                <p className="text-slate-600 text-xs mt-2">{r.author_name} · {new Date(r.created_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reply form */}
        <form onSubmit={handleReply} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
          <h3 className="text-white font-semibold text-sm mb-3">Leave a Reply</h3>
          <textarea
            required
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={3}
            placeholder="Write your reply..."
            className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-orange-500/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors resize-none placeholder:text-slate-600 mb-3"
          />
          <button
            type="submit"
            disabled={submitting || !body.trim()}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            <Send size={13} /> {submitting ? 'Posting...' : 'Post Reply'}
          </button>
        </form>
      </main>
    </>
  )
}
