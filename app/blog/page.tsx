import PageWrapper from '@/components/Container/PageWrapper'
import { getAllBlogs } from '@/utils/actions/blog/get-all-blogs'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
export default async function BlogPage() {
  const result = await getAllBlogs()

  return (
    <PageWrapper>
      <div className="flex flex-col mt-[1rem] mb-[5rem] justify-center items-center w-[90%]">
        <div className='flex flex-col items-center p-3 w-full'>
          <div className='flex flex-col justify-start items-center gap-2 w-full'>
            <div className='flex gap-3 justify-start items-center w-full'>
              <h1 className="scroll-m-20 text-3xl md:text-4xl tracking-tight font-bold text-center">
                The Starter Blog
              </h1>
            </div>
            <div className='flex gap-3 justify-start items-center w-full border-b pb-4'>
              <p className="text-gray-500">
                Start your blog on this starter kit <span className='font-bold dark:text-white text-black underline'>NOW</span>
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-5">
          {result?.response?.map((info: any) => (
            <Link key={info?.id} href={`/blog/${info?.slug}`}>
              <article
                className="flex flex-col space-y-2 p-4 rounded-md border"
              >
                <Image
                  src={info?.image}
                  alt={""}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                />
                <div className='flex lg:flex-row w-full justify-between items-center'>
                  <h2 className="text-lg lg:text-2xl font-bold">{info?.title}</h2>
                  <div>
                    <Badge>{info?.category?.category}</Badge>
                  </div>
                </div>
                <p className="text-muted-foreground">{info?.subtitle}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(info?.created_at)?.toLocaleDateString()}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
