"use client"

import CustomLink from '@/components/custom-link'
import clsx from 'clsx'
import {
  Banknote,
  Folder,
  HomeIcon,
  Settings
} from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardSideBar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r h-full bg-background">
      <div className="flex h-full flex-col">
        <div className="flex h-[3.45rem] items-center border-b px-4">
          <Link prefetch={true} className="flex items-center gap-2 font-semibold hover:cursor-pointer" href="/">
            <span>Nextjs Starter Kit</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          <Link prefetch={true}
            href="/dashboard"
            className={clsx(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === "/dashboard"
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <HomeIcon className="h-4 w-4" />
            Overview
          </Link>

          <Link prefetch={true}
            href="/dashboard/projects"
            className={clsx(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === "/dashboard/projects"
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Folder className="h-4 w-4" />
            Projects
          </Link>

          <Link prefetch={true}
            href="/dashboard/finance"
            className={clsx(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === "/dashboard/finance"
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Banknote className="h-4 w-4" />
            Finance
          </Link>

          <Link prefetch={true}
            href="/dashboard/settings"
            className={clsx(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === "/dashboard/settings"
                ? "bg-primary/10 text-primary hover:bg-primary/20"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
    </div>
  )
}
