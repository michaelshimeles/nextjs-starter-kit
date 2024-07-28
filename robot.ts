import { getAllBlogs } from "./utils/functions/blog/get-all-blogs";

export default async function robots() {
  const baserl = "https://starter.rasmic.xyz";

  const { response: blogResponse } = await getAllBlogs(
    process.env.BLOG_SITE_ID!
  );

  const blogPosts = blogResponse?.map((post: any) => {
    return {
      url: `${baserl}/blog/${post?.slug}`,
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
      priority: 1,
    },
    ...blogPosts,
  ];
}
