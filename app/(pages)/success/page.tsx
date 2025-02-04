'use client';

import { Button } from '@/components/ui/button';
import NavBar from '@/components/wrapper/navbar';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

export default function SuccessPage() {
  const { userId } = useAuth();
  const subscriptionStatus = useQuery(api.subscriptions.getUserSubscriptionStatus);

  const canAccessDashboard = userId && subscriptionStatus?.hasActiveSubscription;

  return (
    <main className="flex min-w-screen flex-col items-center justify-between">
      <NavBar />
      <h1 className="mt-[35vh] mb-3 scroll-m-20  text-5xl font-semibold tracking-tight transition-colors first:mt-0">
        Welcome to Nextjs Starter Kit 🎉
      </h1>
      <p className="leading-7 text-center w-[60%]">
        Let&apos;s get cooking
      </p>
      <Link href={canAccessDashboard ? "/dashboard" : "/pricing"} className='mt-4'>
        <Button>{canAccessDashboard ? "Access Dashboard" : "View Pricing"}</Button>
      </Link>
    </main>
  )
}
