"use client"

import CustomLink from '@/components/custom-link'
import { Separator } from '@/components/ui/separator'
import clsx from 'clsx'
import {
  Banknote,
  Folder,
  HomeIcon,
  Settings
} from "lucide-react"
import { usePathname } from 'next/navigation'

export default function DashboardSideBar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r h-full bg-background">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <CustomLink className="flex items-center gap-2 font-semibold hover:cursor-pointer" href="/">
            <span>Nextjs Starter Kit</span>
          </CustomLink>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          <CustomLink
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
          </CustomLink>

          <CustomLink
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
          </CustomLink>

          <CustomLink
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
          </CustomLink>

          <CustomLink
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
          </CustomLink>
        </nav>
      </div>
    </div>
  )
}
