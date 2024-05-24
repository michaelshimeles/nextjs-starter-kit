"use server";

export async function getBlogSlug(slug: string) {
  try {
    const response = await fetch(`https://cms.rasmic.xyz/api/blog/${slug}`, {
      method: "POST",
      headers: {
        "X-Auth-Key": process.env.CMS_API_KEY!,
      },
    });

    const result = await response.json();
    console.log('result', result)

    return result;
  } catch (error) {
    return {
      error,
    };
  }
}
