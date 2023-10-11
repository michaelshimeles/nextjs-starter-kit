"use client"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Dialog, DialogClose } from "@radix-ui/react-dialog"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { ModeToggle } from "./ModeToggle"
import { Profile } from "./Profile"
import { SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Blog",
        href: "/resources/blog",
        description:
            "Deepen your knowledge.",
    },
]

export function NavBar() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();


    return (
        <div className="flex min-w-full justify-between p-2 border-b z-10">
            <Dialog>
                <SheetTrigger className="min-[825px]:hidden p-2 transition">
                    <GiHamburgerMenu />
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>Nextjs Start Template</SheetTitle>
                        <SheetDescription>
                            Plan, Build & Scale.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col space-y-3 mt-[1rem]">
                        <DialogClose asChild>
                            <Link href="/">
                                <Button variant="outline" className="w-full">Home</Button>
                            </Link>
                        </DialogClose>
                        <DialogClose asChild>
                            <Link href="/contact-us">
                                <Button variant="outline" className="w-full">Contact Us</Button>
                            </Link>
                        </DialogClose>
                        <DialogClose asChild>
                            <Link href="/about">
                                <Button variant="outline" className="w-full">About Us</Button>
                            </Link>
                        </DialogClose>
                    </div>
                </SheetContent>
            </Dialog>

            <NavigationMenu>
                <NavigationMenuList className="max-[825px]:hidden ">
                    {/* <Link href="/">
                        <Image src="/next.svg" width={75} height={50} alt="logo" />
                    </Link> */}
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref className="cursor-pointer">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Home
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Exodus Labs</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/"
                                        >
                                            <Image src="/next.svg" width={75} height={50} alt="logo" />
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                Nextjs Starter Template
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Plan, Build & Scale.
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/english-ministry" title="Exodus Labs">
                                    Exodus Lab is an Engineering Firm that builds products that solve real problems
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/contact-us" legacyBehavior passHref className="cursor-pointer">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Contact Us
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/about" legacyBehavior passHref className="cursor-pointer">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                About Us
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-3">
                {userId && <Profile />}
                <ModeToggle />
            </div>
        </div>

    )
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
    )
})
ListItem.displayName = "ListItem"
