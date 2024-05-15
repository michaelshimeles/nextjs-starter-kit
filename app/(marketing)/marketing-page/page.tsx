import PageWrapper from '@/components/Container/PageWrapper'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  metadataBase: new URL("https://starter.rasmic.xyz"),
  keywords: [''],
  title: 'Marketing page',
  openGraph: {
    description: 'Put description of the page.',
    images: ['']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing page',
    description: 'Put description of the page.',
    siteId: "",
    creator: "@rasmickyy",
    creatorId: "",
    images: [''],
  },
}


export default async function MarketingPage() {

  return (
    <PageWrapper>
      <div className='flex flex-col min-h-screen items-center mt-[4rem] p-3 w-full'>
        <h1 className="scroll-m-20 text-5xl font-bold tracking-tight lg:text-6xl text-center">
          Example Marketing Page
        </h1>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-md text-center mt-2 dark:text-gray-400">
          Use this static page to have an explainer video with CTA and some copy.
        </p>
        <Link href="/dashboard" className="mt-2">
          <Button>Get Started</Button>
        </Link>
        <div className='my-3'>
          <video width="900" height="240" controls id="player1" preload="none">
            <source src="https://www.youtube.com/watch?v=ml9Fz2aUx9k" type="video/mp4" />
          </video>
        </div>
        <div className='flex flex-col min-h-screen max-w-[900px] items-center my-[2rem]'>
          <article className="max-w-4xl mx-auto pb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-6">Lorem ipsum dolor sit amet</h1>

            <section className="mb-8">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 mb-3 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Lorem ipsum</h2>
              <p className="text-md leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </section>

            <section className="mb-8">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 mb-3 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Lorem ipsum</h2>
              <p className="text-md mb-5 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p className="text-md mb-5 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p className="text-md mb-5 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </section>

            <section className="mb-8">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 mb-3 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Lorem ipsum</h2>
              <p className="text-md mb-5 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <ol className="flex flex-col gap-1 list-decimal ml-8 mb-4">
                <li className="mb-2"><strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li className="mb-2"><strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li className="mb-2"><strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 mb-3 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Lorem ipsum</h2>
              <p className="text-md mb-5 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <ul className=" flex flex-col gap-1 list-disc ml-8 mb-4">
                <li className="mb-2"><strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li className="mb-2"><strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li className="mb-2"><strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 mb-3 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Lorem ipsum</h2>
              <p className="text-md mb-5 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <ul className=" flex flex-col gap-1 list-disc ml-8 mb-4">
                <li className="mb-2"><strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li className="mb-2"><strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 mb-3 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Lorem ipsum</h2>
              <p className="text-md mb-5 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <ul className=" flex flex-col gap-1 list-disc ml-8 mb-4">
                <li className="mb-2"><strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li className="mb-2"><strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 mb-3 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Lorem ipsum</h2>
              <p className="text-md mb-5 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p className="text-md mb-5 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </section>

            <section>
              <h2 className="mt-10 scroll-m-20 border-b pb-2 mb-3 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Lorem ipsum</h2>
              <p className="text-md   leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </section>
          </article>
        </div>

      </div>
    </PageWrapper>
  )
}
