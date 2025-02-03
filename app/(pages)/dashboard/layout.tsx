import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { ReactNode } from "react";
import DashboardSideBar from "./_components/dashboard-side-bar";
import DashboardTopNav from "./_components/dashbord-top-nav";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const preloadedSubscriptionStatus = await preloadQuery(api.subscriptions.getUserSubscriptionStatus)

  return (
    <div className="flex h-screen overflow-hidden w-full">
      <DashboardSideBar preloadedSubscriptionStatus={preloadedSubscriptionStatus} />
      <main className="flex-1 overflow-y-auto">
        <DashboardTopNav>{children}</DashboardTopNav>
      </main>
    </div>
  );
}
