import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Nextjs Starter Kit
          </h2>
          <p className="mt-4">
            Built using Nextjs, BetterAuth, Neon PostgreSQL, and more
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/dashboard" prefetch={true}>
                <span>Dashboard</span>
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link
                href="https://github.com/michaelshimeles/nextjs-starter-kit"
                target="_blank"
                rel="noopener noreferrer"
                prefetch={true}
              >
                <span>Github</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
