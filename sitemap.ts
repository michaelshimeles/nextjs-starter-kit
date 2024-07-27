import { getAllBlogs } from "./utils/functions/blog/get-all-blogs";

export default async function sitemap() {
  const baserl = "https://starter.rasmic.xyz";

  const { result } = await getAllBlogs(process.env.BLOG_SITE_ID!);

  const blogPosts = result?.map((post: any) => {
    return {
      url: `${baserl}/blog/${post?.slug}`,
      changeFrequency: "weekly",
      lastModified: post?.created_at,
    };
  });

  return [
    {
      url: baserl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baserl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts,
  ];
}
