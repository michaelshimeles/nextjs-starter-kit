import { ReactNode } from "react"
import DashboardSideBar from "./_components/dashboard-side-bar"
import DashboardTopNav from "./_components/dashbord-top-nav"
import { isAuthorized } from "@/utils/data/user/isAuthorized"
import { redirect } from "next/dist/server/api-utils"
import { currentUser } from "@clerk/nextjs/server"

export default async function DashboardLayout({ children }: { children: ReactNode }) {

  const user = await currentUser()
  const { authorized, message } = await isAuthorized(user?.id!)
  if (!authorized) {
    console.log('authorized check fired')
  }
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <DashboardSideBar />
      <div className="flex-1">
        <DashboardTopNav>
          <main className="p-6 space-y-6">
            {children}
          </main>
        </DashboardTopNav>
      </div>
    </div>
  )
}
