import Link from 'next/link'
import { Flame, Shield, MessageSquare, ArrowLeftRight, Megaphone, ChevronRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="bg-red-600 rounded-lg p-1.5">
            <Flame size={16} className="text-white" />
          </div>
          <span className="font-bold text-sm tracking-tight">Toronto Fire Crew</span>
        </div>
        <Link href="/login"
          className="text-sm font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-lg transition-colors">
          Member Login →
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-16 pb-32 min-h-[88vh]">

        {/* Background photo + overlays */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1752316435365-1c4a35acfed2?fm=jpg&q=80&w=1920&auto=format&fit=crop)' }} />
          {/* Dark base overlay */}
          <div className="absolute inset-0 bg-slate-950/75" />
          {/* Orange fire glow from bottom */}
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 50% 110%, rgba(220,38,38,0.35) 0%, rgba(220,38,38,0.15) 40%, transparent 70%)' }} />
          {/* Vignette top */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(2,6,23,0.6) 0%, transparent 40%, transparent 60%, rgba(2,6,23,0.8) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-red-600/25 bg-red-600/5 text-red-400 text-xs font-semibold tracking-[0.15em] uppercase px-4 py-2 rounded-full mb-10">
            <Shield size={10} /> Members Only · Invite Required
          </div>

          {/* Title */}
          <h1 className="font-black leading-none tracking-tighter uppercase mb-6"
            style={{ fontSize: 'clamp(3.5rem, 13vw, 8.5rem)' }}>
            <span className="text-white block">Toronto</span>
            <span className="block" style={{ WebkitTextStroke: '2px rgba(220,38,38,0.8)', color: 'transparent' }}>Fire</span>
            <span className="text-red-600 block">Crew</span>
          </h1>

          <p className="text-slate-400 text-lg max-w-lg mx-auto mb-12 leading-relaxed">
            A private community built on transparency and open communication for Toronto Fire Service members. Discussions, duty exchanges, and announcements — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-400 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-lg shadow-red-600/25 hover:shadow-red-600/40">
              Sign In <ChevronRight size={15} />
            </Link>
            <Link href="/request-access"
              className="inline-flex items-center justify-center border border-white/10 hover:border-white/20 hover:bg-white/[0.04] text-white font-semibold px-8 py-4 rounded-xl text-sm transition-all">
              Request Access
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-700">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-700 to-transparent" />
        </div>
      </section>

      {/* Stats strip */}
      <div className="border-y border-white/[0.05] bg-white/[0.015]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {['A · B · C · D Platoon', 'Private Forum', 'Shift Board', 'Admin Approved', 'Members Only'].map((s, i, arr) => (
            <span key={s} className="flex items-center gap-6 md:gap-10">
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500">{s}</span>
              {i < arr.length - 1 && <span className="text-white/[0.08] hidden md:block">·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-28">
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-red-600 mb-3">Built for the crew</p>
          <h2 className="text-4xl font-black tracking-tight text-white">Everything in one place</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: MessageSquare,
              title: 'Forum',
              desc: 'Threaded discussions by topic. General, on the job, health — say what needs to be said, with the people who get it.',
              accent: 'orange',
            },
            {
              icon: ArrowLeftRight,
              title: 'Duty Exchanges',
              desc: 'Post a shift you need covered or pick one up. Platoon, station, date — everything you need to sort a trade fast.',
              accent: 'red',
            },
            {
              icon: Megaphone,
              title: 'Announcements',
              desc: 'Important updates from admin land here first. Pinned posts stay visible so nothing gets buried.',
              accent: 'orange',
            },
          ].map((f) => (
            <div key={f.title}
              className="group relative bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.07] hover:border-white/[0.12] rounded-2xl p-7 transition-all overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${f.accent === 'orange' ? 'via-red-600/60' : 'via-red-500/60'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                f.accent === 'orange'
                  ? 'bg-red-600/10 border border-red-600/20 text-red-400'
                  : 'bg-red-600/10 border border-red-600/20 text-red-400'
              }`}>
                <f.icon size={19} />
              </div>
              <h3 className="text-white font-bold text-base mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 pb-28">
        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-600 to-red-600" />
          <div className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-10 py-10">
            <div>
              <p className="text-red-200 text-xs font-semibold tracking-widest uppercase mb-2">Already approved?</p>
              <h2 className="text-3xl font-black tracking-tight text-white">Sign in and get involved.</h2>
            </div>
            <Link href="/login"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-red-700 font-bold px-7 py-3.5 rounded-xl text-sm hover:bg-red-50 transition-colors whitespace-nowrap">
              Member Sign In <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8 text-center px-6">
        <p className="text-slate-700 text-xs">
          Toronto Fire Crew is an independent member community. Not affiliated with or endorsed by TPFFA or Toronto Fire Services.
        </p>
      </footer>

    </div>
  )
}
