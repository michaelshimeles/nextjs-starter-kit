import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { organization } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter is required", available: false },
        { status: 400 },
      );
    }

    const existingOrg = await db
      .select({ id: organization.id })
      .from(organization)
      .where(eq(organization.slug, slug))
      .limit(1);

    const available = existingOrg.length === 0;

    return NextResponse.json({ available });
  } catch (error) {
    console.error("Error checking slug availability:", error);
    return NextResponse.json(
      { error: "Internal server error", available: false },
      { status: 500 },
    );
  }
}
