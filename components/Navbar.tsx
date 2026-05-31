'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Flame, LayoutDashboard, MessageSquare, ArrowLeftRight, Megaphone, LogOut, Menu, X, Shield } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/forum', label: 'Forum', icon: MessageSquare },
  { href: '/shifts', label: 'Duty Exchanges', icon: ArrowLeftRight },
]

export default function Navbar({ isAdmin }: { isAdmin?: boolean }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function signOut() {
    await createClient().auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-white">
          <div className="bg-red-600 text-white rounded-lg p-1.5">
            <Flame size={15} />
          </div>
          <span className="text-sm">Toronto Fire Crew</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === href ? 'bg-red-600/15 text-red-400' : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}>
              <Icon size={14} /> {label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith('/admin') ? 'bg-red-600/15 text-red-400' : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}>
              <Shield size={14} /> Admin
            </Link>
          )}
          <button onClick={signOut}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-500 hover:text-white transition-colors ml-2">
            <LogOut size={14} /> Sign Out
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-slate-950 px-4 pb-4 pt-3 flex flex-col gap-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                pathname === href ? 'bg-red-600/15 text-red-400' : 'text-slate-400'
              }`}>
              <Icon size={14} /> {label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400">
              <Shield size={14} /> Admin
            </Link>
          )}
          <button onClick={signOut}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 text-left">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      )}
    </nav>
  )
}
