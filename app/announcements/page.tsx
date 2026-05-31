import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import { Megaphone, Pin } from 'lucide-react'

export default async function AnnouncementsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: announcements } = await supabase
    .from('tfc_announcements')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-10 w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-red-600/10 border border-red-600/20 text-red-400 w-10 h-10 rounded-xl flex items-center justify-center">
            <Megaphone size={18} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Announcements</h1>
            <p className="text-slate-500 text-sm">Official updates from admin.</p>
          </div>
        </div>

        <div className="space-y-4">
          {!announcements || announcements.length === 0 ? (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-10 text-center">
              <Megaphone size={32} className="text-slate-700 mx-auto mb-3" />
              <p className="text-slate-600 text-sm">No announcements yet.</p>
            </div>
          ) : (
            announcements.map((a) => (
              <div key={a.id} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 className="font-bold text-white text-base">{a.title}</h2>
                  {a.pinned && (
                    <span className="flex items-center gap-1 text-red-400 text-xs font-medium shrink-0">
                      <Pin size={11} /> Pinned
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">{a.body}</p>
                <p className="text-slate-600 text-xs mt-4">{new Date(a.created_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  )
}
