export async function getAllBlogs(site_id: string) {
  try {
    const response = await fetch(`https://tsafi.xyz/api/blog/all/${site_id}`, {
      method: "POST",
      headers: {
        "X-Auth-Key": process.env.CMS_API_KEY!,
      },
      cache: "no-store",
    });

    const result = await response.json();

    return result;
  } catch (error) {
    return {
      error,
    };
  }
}
