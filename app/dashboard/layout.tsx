import { ReactNode } from "react"
import DashboardNav from "./(components)/DashboardNav"
import DashboardNavMobile from "./(components)/DashboardNavMobile"

export default function DashboardLayout({ children }: { children: ReactNode }) {

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardNav />
      <div className="flex flex-col">
        <DashboardNavMobile />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
