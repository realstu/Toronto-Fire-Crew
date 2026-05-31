import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import { Megaphone, MessageSquare, ArrowLeftRight, Flame } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const firstName = user.user_metadata?.full_name?.split(' ')[0] || 'Member'

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-10 w-full">

        {/* Welcome */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium px-3 py-1 rounded-full mb-3">
            <Flame size={11} /> Members Area
          </div>
          <h1 className="text-3xl font-extrabold text-white">Welcome back, {firstName}</h1>
          <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening in the crew.</p>
        </div>

        {/* Quick links */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { href: '/announcements', icon: Megaphone, label: 'Announcements', desc: 'Latest updates from admin', color: 'orange' },
            { href: '/forum', icon: MessageSquare, label: 'Forum', desc: 'Join the discussion', color: 'blue' },
            { href: '/shifts', icon: ArrowLeftRight, label: 'Shift Swaps', desc: 'Post or find a trade', color: 'emerald' },
          ].map(({ href, icon: Icon, label, desc, color }) => (
            <Link key={href} href={href}
              className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-white/[0.12] rounded-2xl p-5 transition-all">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                color === 'orange' ? 'bg-orange-500/10 border border-orange-500/20 text-orange-400' :
                color === 'blue' ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' :
                'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
              }`}>
                <Icon size={18} />
              </div>
              <div className="font-bold text-white text-sm mb-1">{label}</div>
              <div className="text-slate-500 text-xs">{desc}</div>
            </Link>
          ))}
        </div>

        {/* Placeholder for recent activity */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 text-center">
          <p className="text-slate-600 text-sm">Recent activity will appear here once the community gets going.</p>
        </div>

      </main>
    </>
  )
}
