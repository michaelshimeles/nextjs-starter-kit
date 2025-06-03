import Form from "./_components/form";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function Onboarding() {
  // Check authentication first
  const result = await auth.api.getSession({
    headers: await headers(),
  });

  if (result?.session.activeOrganizationId) redirect("/dashboard/create");

  // Only proceed with org check if authenticated
  if (result?.session?.userId) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-screen gap-2">
        <Form userId={result?.session?.userId} />
      </div>
    );
  } else {
    redirect("/sign-in");
  }
}
