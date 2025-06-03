import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Analytics({}) {
  // Get the passId from the URL query parameters

  const result = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!result?.session?.userId) {
    redirect("/sign-in");
  }

  return (
    <div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start justify-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              View analytics for your passes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
