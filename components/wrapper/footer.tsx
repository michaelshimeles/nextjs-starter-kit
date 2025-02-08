"use client"
import { ArrowRight, Github, Sparkles, Twitter } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function Footer() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data: any) => {
        // Handle newsletter submission
        console.log(data);
        reset();
    };

    const links = {
        product: [
            { name: 'Features', href: '/features' },
            { name: 'Documentation', href: '/docs' },
            { name: 'Examples', href: '/examples' },
            { name: 'Pricing', href: '/pricing' },
        ],
        company: [
            { name: 'About', href: '/about' },
            { name: 'Blog', href: '/blog' },
            { name: 'Careers', href: '/careers' },
            { name: 'Contact', href: '/contact' },
        ],
        legal: [
            { name: 'Privacy', href: '/privacy' },
            { name: 'Terms', href: '/terms' },
            { name: 'License', href: '/license' },
        ],
    };

    return (
        <footer className="border-t bg-white dark:bg-black">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Brand */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-blue-600" />
                            <span className="font-semibold">Next Starter</span>
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
                            Launch your SaaS in minutes with our production-ready Next.js starter kit.
                            Everything you need, from auth to payments.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://github.com/michaelshimeles/nextjs14-starter-template" target="_blank">
                                <Button variant="ghost" size="icon">
                                    <Github className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="https://twitter.com" target="_blank">
                                <Button variant="ghost" size="icon">
                                    <Twitter className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Product</h3>
                                <ul className="mt-4 space-y-4">
                                    {links.product.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Company</h3>
                                <ul className="mt-4 space-y-4">
                                    {links.company.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Stay Updated</h3>
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                Subscribe to our newsletter for updates, tips, and special offers.
                            </p>
                            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 sm:flex sm:max-w-md">
                                <div className="flex-1">
                                    <Input
                                        {...register('email', { required: true })}
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full min-w-0 rounded-full border-gray-300"
                                    />
                                </div>
                                <div className="mt-3 sm:ml-3 sm:mt-0">
                                    <Button type="submit" className="w-full rounded-full bg-blue-600 hover:bg-blue-500 text-white">
                                        Subscribe
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </form>
                            <div className="mt-8">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Legal</h3>
                                <ul className="mt-4 space-y-4">
                                    {links.legal.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        &copy; {new Date().getFullYear()} Next Starter. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
