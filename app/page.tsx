import Link from 'next/link'
import { Flame, MessageSquare, ArrowLeftRight, Megaphone, Lock } from 'lucide-react'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">

      {/* Header */}
      <header className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2.5 font-bold text-lg text-white">
          <div className="bg-orange-500 text-white rounded-lg p-1.5">
            <Flame size={17} />
          </div>
          Toronto Fire Crew
        </div>
        <Link href="/login"
          className="bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors">
          Member Login
        </Link>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[700px] h-[500px] bg-orange-500/8 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <Lock size={12} /> Members Only — Invite Required
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-5">
            Toronto Fire Crew
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
            A private community for Toronto Fire Service members. Discussions, shift swaps, and announcements — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login"
              className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-base">
              Sign In
            </Link>
            <Link href="/request-access"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base">
              Request Access
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4 pb-20 grid sm:grid-cols-3 gap-5 w-full">
        {[
          { icon: MessageSquare, title: 'Forum', desc: 'Threaded discussions by topic. Say what needs to be said.' },
          { icon: ArrowLeftRight, title: 'Shift Swaps', desc: 'Post and find shift trades with fellow members.' },
          { icon: Megaphone, title: 'Announcements', desc: 'Important updates posted by admins — never miss a thing.' },
        ].map((f) => {
          const Icon = f.icon
          return (
            <div key={f.title} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
              <div className="bg-orange-500/10 border border-orange-500/20 text-orange-400 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <Icon size={18} />
              </div>
              <h3 className="font-bold text-white mb-1.5">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          )
        })}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] text-slate-600 text-xs text-center py-5 px-4">
        Toronto Fire Crew is an independent member community. Not affiliated with or endorsed by TPFFA or Toronto Fire Services.
      </footer>

    </main>
  )
}
