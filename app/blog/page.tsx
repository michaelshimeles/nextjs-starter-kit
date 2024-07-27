import PageWrapper from '@/components/wrapper/page-wrapper';
import config from '@/config';
import { redirect } from 'next/navigation';
import BlogHeader from './_components/blog-header';
import { getAllBlogs } from '@/utils/functions/blog/get-all-blogs';
import BlogCard from './_components/blog-card';

export default async function BlogPage() {

  if (!config?.features?.blog) {
    redirect("/")
  }
  const { response } = await getAllBlogs(process.env.BLOG_SITE_ID!)

  return (
    <PageWrapper>
      <div className="flex flex-col mt-[1rem] mb-[5rem] justify-center items-center w-[90%]">
        <BlogHeader title='The Starter Blog' description='Start your blog on this starter kit' />
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-5">
          {response?.map((info: any) => (
            <BlogCard key={info?.id} info={info} />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
