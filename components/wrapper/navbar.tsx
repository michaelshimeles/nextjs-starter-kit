"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import config from "@/config";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Dialog } from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { Github, Menu, Sparkles, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import ModeToggle from "../mode-toggle";
import { Button } from "../ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { UserProfile } from "../user-profile";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "AI Playground",
    href: "/playground",
    description: "Interact with the AI in the playground.",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Access your personal dashboard.",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Read my interesting blog posts.",
  },
];

export default function NavBar() {
  const user = useAuth();
  let userId;

  if (user) {
    userId = user?.userId;
  }

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md bg-white/80 dark:bg-black/80"
    >
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Logo - Mobile */}
        <div className="flex lg:hidden items-center gap-2">
          <Dialog>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader className="pb-6 border-b">
                <SheetTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  <span>Next Starter</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 mt-6">
                <div className="px-2 pb-4">
                  <h2 className="text-sm font-medium text-muted-foreground mb-2">
                    Navigation
                  </h2>
                  {components.map((item) => (
                    <Link key={item.href} href={item.href} prefetch={true}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-base font-normal h-11 border border-muted/40 mb-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 transition-colors"
                      >
                        {item.title}
                      </Button>
                    </Link>
                  ))}
                </div>

                <div className="px-2 py-4 border-t">
                  <h2 className="text-sm font-medium text-muted-foreground mb-2">
                    Links
                  </h2>
                  <Link
                    href="https://github.com/michaelshimeles/nextjs14-starter-template"
                    target="_blank"
                    prefetch={true}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-normal h-11 border border-muted/40 mb-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 transition-colors"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>
                  </Link>
                  <Link
                    href="https://twitter.com/rasmickyy"
                    target="_blank"
                    prefetch={true}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-normal h-11 border border-muted/40 mb-2 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 transition-colors"
                    >
                      <Twitter className="h-4 w-4 mr-2" />X (Twitter)
                    </Button>
                  </Link>
                  <Link
                    href="https://youtube.com/@rasmickyy"
                    target="_blank"
                    prefetch={true}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-base font-normal h-11 border border-muted/40 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400 transition-colors"
                    >
                      <Youtube className="h-4 w-4 mr-2" />
                      YouTube
                    </Button>
                  </Link>
                </div>

                {!userId && config?.auth?.enabled && (
                  <div className="px-2 py-4 border-t mt-auto">
                    <Link href="/sign-in" prefetch={true}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-500">
                        Sign in
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Dialog>
          <Link href="/" prefetch={true} className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">Next Starter</span>
          </Link>
        </div>

        {/* Logo - Desktop */}
        <div className="hidden lg:flex items-center gap-2">
          <Link href="/" prefetch={true} className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">Next Starter</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/dashboard" prefetch={true}>
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/playground" prefetch={true}>
            <Button variant="ghost">AI Playground</Button>
          </Link>
          <Link
            href="https://github.com/michaelshimeles/nextjs14-starter-template"
            prefetch={true}
          >
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {!userId && config?.auth?.enabled && (
            <Link href="/sign-in" prefetch={true}>
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-500 text-white"
              >
                Sign in
              </Button>
            </Link>
          )}
          {userId && <UserProfile />}
          <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmichaelshimeles%2Fnextjs-starter-kit&env=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY,NEXT_PUBLIC_CLERK_SIGN_IN_URL,NEXT_PUBLIC_CLERK_SIGN_UP_URL,NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,DATABASE_URL,NEXT_PUBLIC_BASE_URL,OPENAI_API_KEY&envDescription=You'll%20need%20api%20keys%20from%20Clerk%20Auth%2C%20Neon%20Postgres%2C%20%26%20OpenAI&project-name=next-starter&repository-name=next-starter&redirect-url=https%3A%2F%2Fwww.nextstarter.xyz%2F&demo-title=Next%20Starter&demo-description=The%20Ultimate%20Nextjs%2015%20Starter%20Kit%20for%20quickly%20building%20your%20SaaS%2C%20giving%20you%20time%20to%20focus%20on%20what%20really%20matters&demo-url=https%3A%2F%2Fwww.nextstarter.xyz%2F&demo-image=https%3A%2F%2Fdwdwn8b5ye.ufs.sh%2Ff%2FMD2AM9SEY8GucGJl7b5qyE7FjNDKYduLOG2QHWh3f5RgSi0c">
            <img src="https://vercel.com/button" alt="Deploy with Vercel" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
