import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-20">
      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 lg:px-0">
        <div className="relative text-center">
          <p className="text-3xl">🔥</p>
          <h1 className="mx-auto mt-12 max-w-xl text-balance text-5xl font-medium">
            Nextjs Starter Kit
          </h1>
          <p className="text-muted-foreground mx-auto mb-6 mt-4 text-balance text-xl">
            This powerful starter kit is designed to help you launch your SAAS
            application quickly and efficiently.
          </p>
          <div className="flex flex-col items-center gap-2 *:w-full sm:flex-row sm:justify-center sm:*:w-auto">
            <Button asChild variant="default" size="sm">
              <Link href="/dashboard" prefetch={true}>
                <span className="text-nowrap">Get Started</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link
                href="https://github.com/michaelshimeles/nextjs-starter-kit"
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-nowrap">Github</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-3xl bg-black/10">
          <Image
            src="https://images.unsplash.com/photo-1547623641-d2c56c03e2a7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="absolute inset-0 size-full object-cover"
            width={1920}
            height={1080}
          />

          <div className="bg-background rounded-(--radius) relative m-4 overflow-hidden border border-transparent shadow-xl shadow-black/15 ring-1 ring-black/10 sm:m-8 md:m-12">
            <Image
              src="https://jdj14ctwppwprnqu.public.blob.vercel-storage.com/GsZRNq5WsAAMbrG-H9YrPK4HJnXSQV692jECFST4zyYpva.jpg"
              alt="app screen"
              width="2880"
              height="1842"
              className="object-top-left size-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
