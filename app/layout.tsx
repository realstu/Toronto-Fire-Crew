import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import AuthCodeExchange from '@/components/AuthCodeExchange'
import './globals.css'

const font = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'Toronto Fire Crew — Members Only',
  description: 'Private community platform for Toronto Fire Service members.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased ${font.variable}`}>
      <body className="min-h-full flex flex-col bg-slate-950 font-sans text-white">
        <Suspense><AuthCodeExchange /></Suspense>
        {children}
      </body>
    </html>
  )
}
