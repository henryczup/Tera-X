'use client'

import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

type PinContainerProps = {
  title: string
  href: string
  className?: string
  children: React.ReactNode
}

export function PinContainer({ title, href, className, children }: PinContainerProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={title}
      className={cn(
        'group relative block w-full max-w-xl rounded-[2.5rem] border border-border bg-card/80 p-1 shadow-[0_25px_120px_rgba(15,23,42,0.25)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-2',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[2.4rem] bg-[radial-gradient(circle_at_top,_rgba(253,224,140,0.6),_transparent_60%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative h-full rounded-[2.3rem] border border-white/20 bg-gradient-to-br from-white to-white/70 p-6">
        {children}
      </div>
    </Link>
  )
}
