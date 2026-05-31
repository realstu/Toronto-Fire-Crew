import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import { Shield } from 'lucide-react'

const ADMIN_EMAIL = 'stuartoggrealtor@gmail.com'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== ADMIN_EMAIL) redirect('/dashboard')

  const { data: requests } = await supabase
    .from('tfc_access_requests')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <>
      <Navbar isAdmin />
      <main className="max-w-4xl mx-auto px-4 py-10 w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-orange-500/10 border border-orange-500/20 text-orange-400 w-10 h-10 rounded-xl flex items-center justify-center">
            <Shield size={18} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Admin Panel</h1>
            <p className="text-slate-500 text-sm">Manage members and access requests.</p>
          </div>
        </div>

        <h2 className="text-white font-bold mb-4">Access Requests</h2>
        <div className="space-y-3">
          {!requests || requests.length === 0 ? (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 text-center">
              <p className="text-slate-600 text-sm">No pending requests.</p>
            </div>
          ) : (
            requests.map((r) => (
              <div key={r.id} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-bold text-white">{r.name}</div>
                    <div className="text-slate-400 text-sm">{r.email}</div>
                    <div className="text-slate-500 text-xs mt-1">Badge: {r.badge} · {r.station}</div>
                    {r.notes && <div className="text-slate-600 text-xs mt-1">{r.notes}</div>}
                    <div className="text-slate-700 text-xs mt-2">{new Date(r.created_at).toLocaleDateString('en-CA')}</div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      r.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                      r.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                      'bg-orange-500/10 text-orange-400'
                    }`}>
                      {r.status || 'pending'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  )
}
