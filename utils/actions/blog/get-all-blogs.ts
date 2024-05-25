"use server";

export async function getAllBlogs() {
  try {
    const response = await fetch(`https://cms.rasmic.xyz/api/blog/all`, {
      headers: {
        "X-Auth-Key": process.env.CMS_API_KEY!,
      },
      cache: "no-store"
    });

    const result = await response.json();

    return result;
  } catch (error) {
    return {
      error,
    };
  }
}
