import { db } from "@/db/drizzle";
import { organization } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  console.log("searchParams", searchParams);

  if (!slug) {
    return new Response("Slug is required", { status: 400 });
  }

  const org = await db
    .select()
    .from(organization)
    .where(eq(organization.slug, slug))
    .limit(1);

  console.log("org", org);
  if (org.length > 0) {
    return new Response("Slug is already taken", { status: 409 });
  }

  return new Response("Slug is available", { status: 200 });
}
