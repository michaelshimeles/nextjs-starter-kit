import { currentUser } from "@clerk/nextjs/server";
import { ReactNode } from "react";
import DashboardSideBar from "./_components/dashboard-side-bar";
import DashboardTopNav from "./_components/dashbord-top-nav";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();
  // const { authorized } = await isAuthorized(user?.id!);

  // if (!authorized) {
  //   console.log("not authorized");
  //   redirect("/not-subscriber");
  // }
  return (
    <div className="flex h-screen overflow-hidden w-full">
      <DashboardSideBar />
      <main className="flex-1 overflow-y-auto">
        <DashboardTopNav>{children}</DashboardTopNav>
      </main>
    </div>
  );
}
