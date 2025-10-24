import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SPEMStats } from "./_components/spe-m-stats";

export default async function Dashboard() {
  const result = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!result?.session?.userId) {
    redirect("/sign-in");
  }

  return (
    <section className="flex flex-col items-start justify-start p-6 w-full">
      <div className="w-full">
        <div className="flex flex-col items-start justify-center gap-2 mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Dashboard SPE-M
          </h1>
          <p className="text-muted-foreground">
            Visão geral do sistema de avaliação estética médica
          </p>
        </div>
        <SPEMStats />
      </div>
    </section>
  );
}
