"use client"
import Link from 'next/link';
import * as React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { UserProfile } from "../user-profile";
import ModeToggle from "../mode-toggle";
import { BlocksIcon } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import config from "@/config";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Dialog, DialogClose } from "@radix-ui/react-dialog";

export default function NavBar() {
    let userId = null;
    if (config?.auth?.enabled) {
        const user = useAuth();
        userId = user?.userId;
    }

    return (
        <div className="flex min-w-full fixed justify-between p-2 z-10 bg-transparent backdrop-blur-sm">
            <div className="flex justify-between w-full min-[825px]:hidden">
                <Dialog>
                    <SheetTrigger className="p-2 transition">
                        <Button size="icon" variant="ghost" className="w-4 h-4 text-white hover:bg-white/10" aria-label="Open menu" asChild>
                            <GiHamburgerMenu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Woopla</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col space-y-3 mt-[1rem]">
                            <DialogClose asChild>
                                <Link href="/">
                                    <Button variant="outline" className="w-full">Home</Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/dashboard/events" legacyBehavior passHref className="cursor-pointer">
                                    <Button variant="outline">
                                        Wydarzenia
                                    </Button>
                                </Link>
                            </DialogClose>
                        </div>
                    </SheetContent>
                </Dialog>
                <ModeToggle />
            </div>
            <NavigationMenu className="flex justify-center w-full">
                <NavigationMenuList className="flex gap-3 items-center justify-center w-full">
                    <Link href="/" className="flex items-center text-white hover:opacity-80" aria-label="Home">
                        <BlocksIcon aria-hidden="true" className="text-[#CAFC03]"/>
                        <span className="ml-2 text-lg font-bold">Woopla</span>
                    </Link>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-between gap-2 max-[825px]:hidden">
                <Link href="/dashboard/events" legacyBehavior passHref>
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                        Wydarzenia
                    </Button>
                </Link>
                {userId && <UserProfile />}
            </div>
        </div>
    );
}