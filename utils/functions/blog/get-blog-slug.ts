export async function getBlogSlug(slug: string, site_id: string) {
  try {
    const response = await fetch(`https://tsafi.xyz/api/blog/${site_id}/${slug}`, {
      method: "POST",
      headers: {
        "X-Auth-Key": process.env.CMS_API_KEY!,
      },
    });

    const result = await response.json();

    return result;
  } catch (error) {
    return {
      error,
    };
  }
}