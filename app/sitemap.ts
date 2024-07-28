import { getAllBlogs } from "../utils/functions/blog/get-all-blogs";

type BlogPost = {
  slug: string;
  created_at: string;
};

type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

export default async function sitemap(): Promise<SitemapEntry[]> {
  const baseUrl = "https://starter.rasmic.xyz";

  let blogPosts: SitemapEntry[] = [];
  try {
    const { response } = await getAllBlogs(process.env.BLOG_SITE_ID!);

    if (Array.isArray(response)) {
      blogPosts = response.map((post: BlogPost) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.created_at || new Date().toISOString(),
        changeFrequency: "weekly",
      }));
    } else {
      console.error("getAllBlogs did not return an array:", response);
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }

  const staticPages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  return [...staticPages, ...blogPosts];
}
