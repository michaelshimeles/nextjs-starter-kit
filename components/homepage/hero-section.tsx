import { ArrowRight, Github } from 'lucide-react';
import Link from "next/link";
import { BorderBeam } from "../magicui/border-beam";
import { Button } from "../ui/button";
import Image from 'next/image';
export default function HeroSection() {

    return (
        <div className='flex flex-col items-center justify-center leading-6 mt-[3rem]'>

            <h1 className="scroll-m-20 text-4xl sm:text-4xl md:text-6xl font-semibold tracking-tight lg:text-7xl text-center max-w-[1120px] bg-gradient-to-b dark:text-white">
                build & ship fast
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 text-xl text-center mt-2 dark:text-gray-400">
                Everything you need to quickly build your SaaS giving you time to focus on what really matters
            </p>
            <div className="flex justify-center items-center gap-3">
                <Link href="/dashboard" className="mt-5">
                    <Button className="animate-buttonheartbeat rounded-md bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white">
                        Get Started
                    </Button>
                </Link>

                <Link
                    href="https://discord.gg/HUcHdrrDgY"
                    target='_blank'
                    className="mt-5"
                    aria-label="Join Discord (opens in a new tab)"
                >
                    <Button variant="outline" className="flex gap-1">
                        Join Discord
                        <ArrowRight className='w-4 h-4' aria-hidden="true" />
                    </Button>
                </Link>
                <Link
                    href="https://github.com/michaelshimeles/nextjs14-starter-template"
                    target='_blank'
                    className='animate-buttonheartbeat border p-2 rounded-full mt-5 hover:dark:bg-black hover:cursor-pointer'
                    aria-label="View NextJS 14 Starter Template on GitHub"
                >
                    <Github className='w-5 h-5' aria-hidden="true" />
                </Link>
            </div>
            <div>
                <div className="relative flex max-w-6xl justify-center overflow-hidden mt-7">
                    <div className="relative rounded-xl">
                        <Image
                            src="https://utfs.io/f/31dba2ff-6c3b-4927-99cd-b928eaa54d5f-5w20ij.png"
                            alt="Hero Image"
                            width={1100}
                            height={550}
                            priority={true}
                            className="block rounded-[inherit] border object-contain shadow-lg dark:hidden"
                        />
                        <Image
                            src="https://utfs.io/f/69a12ab1-4d57-4913-90f9-38c6aca6c373-1txg2.png"
                            width={1100}
                            height={550}
                            alt="Hero Image"
                            priority={true}
                            className="dark:block rounded-[inherit] border object-contain shadow-lg hidden"
                        />
                        <BorderBeam size={250} duration={12} delay={9} />
                    </div>
                </div>
            </div>

        </div>
    )
}
