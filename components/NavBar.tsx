"use client"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { useAuth } from "@clerk/nextjs"
import { Dialog, DialogClose } from "@radix-ui/react-dialog"
import { BlocksIcon } from "lucide-react"
import Link from 'next/link'
import * as React from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { Profile } from "./Profile"
import { Button } from "./ui/button"
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { ModeToggle } from "./ModeToggle"
import { DashboardIcon } from "@radix-ui/react-icons"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Marketing Page",
        href: "/marketing-page",
        description:
            "Write some wavy here to get them to click.",
    },
    {
        title: "Second Tab",
        href: "/",
        description:
            "Write some wavy here to get them to click.",
    },
    {
        title: "Third Tab",
        href: "/",
        description:
            "Write some wavy here to get them to click.",
    },
]

export function NavBar() {
    const { userId } = useAuth();

    return (
        <div className="flex min-w-full fixed justify-between p-2 border-b z-10 dark:bg-black dark:bg-opacity-50 bg-white">
            <div className="flex justify-between w-full min-[825px]:hidden">
                <Dialog>
                    <SheetTrigger className="p-2 transition">
                        <GiHamburgerMenu />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Next Starter</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col space-y-3 mt-[1rem]">
                            <DialogClose asChild>
                                <Link href="/">
                                    <Button variant="outline" className="w-full">Home</Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/dashboard" legacyBehavior passHref className="cursor-pointer">
                                    <Button variant="outline">
                                        Dashboard
                                    </Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/blog" legacyBehavior passHref className="cursor-pointer">
                                    <Button variant="outline">
                                        Blog
                                    </Button>
                                </Link>
                            </DialogClose>
                        </div>
                    </SheetContent>
                </Dialog>
                <ModeToggle />
            </div>
            <NavigationMenu>
                <NavigationMenuList className="max-[825px]:hidden flex gap-3 w-[100%] justify-between">
                    <Link href="/" className="pl-2">
                        <BlocksIcon />
                    </Link>
                </NavigationMenuList>
                <NavigationMenuList>
                    <NavigationMenuItem className="max-[825px]:hidden ml-5">
                        <NavigationMenuTrigger className="dark:bg-black dark:bg-opacity-50">
                            Features
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="flex flex-col w-[400px] gap-3 p-4  lg:w-[500px]">
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
                    <NavigationMenuItem className="max-[825px]:hidden">
                        <Link href="/blog" legacyBehavior passHref>
                            <Button variant="ghost">
                                Blog
                            </Button>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-2 max-[825px]:hidden">
                <Link href="/dashboard" className="max-[825px]:hidden">
                    <Button className="rounded-lg dark:bg-black dark:bg-opacity-50" variant="outline" >
                        <DashboardIcon className="w-4 h-3" />
                        <p className="pl-1">Dashboard</p>
                    </Button>
                </Link>
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
