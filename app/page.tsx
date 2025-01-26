import CustomLink from "@/components/custom-link";
import { Button } from "@/components/ui/button";
import { Twitter } from "lucide-react";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 dark:bg-grid-white/[0.05] bg-grid-black/[0.05]" />
      <div className="absolute inset-0 flex items-center justify-center dark:bg-black bg-white">
        <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-zinc-950 dark:via-black dark:to-zinc-900 bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50" />
        <div className="absolute h-full w-full dark:bg-gradient-to-t dark:from-black dark:to-transparent bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Gradient blobs */}
      <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2">
        <div className="h-96 w-96 animate-pulse rounded-full dark:bg-zinc-600/20 bg-blue-200/40 blur-3xl" />
      </div>
      <div className="absolute right-1/4 bottom-1/4 translate-x-1/2 translate-y-1/2">
        <div className="h-96 w-96 animate-pulse rounded-full dark:bg-zinc-800/20 bg-sky-200/40 blur-3xl" />
      </div>

      {/* Content */}
      <div className="container relative flex flex-col items-center justify-center gap-4 px-4 py-16">
        <h1 className="bg-gradient-to-r dark:from-zinc-400 dark:via-white dark:to-zinc-400 from-blue-600 via-sky-600 to-indigo-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-[5rem]">
          Coming Soon
        </h1>
        <p className="text-lg text-muted-foreground text-center max-w-2xl">
          I&apos;m working on something exciting! In the meantime, check my X
          for updates.
        </p>
        <div className="flex justify-center items-center gap-2 mt-2">
          <CustomLink href="https://twitter.com/rasmickyy">
            <Button
              variant="outline"
              className="rounded-full backdrop-blur-sm bg-background/50 border-border/50"
            >
              <Twitter className="mr-2 h-4 w-4" />
              Follow on X
            </Button>
          </CustomLink>
        </div>
      </div>
    </main>
  );
}
