import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import DashboardSideBar from "./_components/dashboard-side-bar";
import DashboardTopNav from "./_components/dashbord-top-nav";
import { getAuthToken } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {

  const { userId } = await auth();

  const token = await getAuthToken();

  if (!userId) {
    redirect("/sign-in");
  }

  const { hasActiveSubscription } = await fetchQuery(api.subscriptions.getUserSubscriptionStatus, {
  }, {
    token: token!,
  });


  if (!hasActiveSubscription) {
    redirect("/pricing");
  }

  return (
    <div className="flex h-screen overflow-hidden w-full">
      <DashboardSideBar />
      <main className="flex-1 overflow-y-auto">
        <DashboardTopNav>{children}</DashboardTopNav>
      </main>
    </div>
  );
}
