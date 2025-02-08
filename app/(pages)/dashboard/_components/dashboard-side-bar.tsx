"use client"

import clsx from 'clsx'
import {
  Banknote,
  Folder,
  HomeIcon,
  Settings,
  LucideIcon
} from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: HomeIcon
  },
  {
    label: "Finance",
    href: "/dashboard/finance",
    icon: Banknote
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings
  }
]

export default function DashboardSideBar() {
  const pathname = usePathname();
  
  return (
    <div className="min-[1024px]:block hidden w-64 border-r h-full bg-background">
      <div className="flex h-full flex-col">
        <div className="flex h-[3.45rem] items-center border-b px-4">
          <Link prefetch={true} className="flex items-center gap-2 font-semibold hover:cursor-pointer" href="/">
            <span>Nextjs Starter Kit</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              prefetch={true}
              href={item.href}
              className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
