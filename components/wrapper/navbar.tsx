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
import { Github, Menu, Sparkles } from "lucide-react";
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
import { motion } from "framer-motion";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Features",
    href: "/features",
    description: "Explore all the features available in our starter kit.",
  },
  {
    title: "Documentation",
    href: "/docs",
    description: "Learn how to get started and make the most of our starter kit.",
  },
  {
    title: "Examples",
    href: "/examples",
    description: "View example projects built with our starter kit.",
  },
];

export default function NavBar() {
  let userId = null;
  /* eslint-disable react-hooks/rules-of-hooks */
  if (config?.auth?.enabled) {
    const user = useAuth();
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
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-4">
                {components.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button variant="ghost" className="w-full justify-start">
                      {item.title}
                    </Button>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Dialog>
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">Next Starter</span>
          </Link>
        </div>

        {/* Logo - Desktop */}
        <div className="hidden lg:flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
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

          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>

          <Link href="https://github.com/michaelshimeles/nextjs14-starter-template" target="_blank">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {userId && <UserProfile />}
          {!userId && config?.auth?.enabled && (
            <Link href="/sign-in">
              <Button variant="default" className="bg-blue-600 hover:bg-blue-500">Sign in</Button>
            </Link>
          )}
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
