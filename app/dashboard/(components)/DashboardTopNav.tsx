"use client"

import { ModeToggle } from '@/components/ModeToggle'
import { Profile } from '@/components/Profile'
export default function DashboardTopNav() {
  return (
    <header className="flex h-14 justify-end items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Profile />
      <ModeToggle />
    </header>
  )
}
