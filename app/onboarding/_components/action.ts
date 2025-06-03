"use server";
import { db } from "@/db/drizzle";
import { onboarding_info } from "@/db/schema";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface Info {
  name: string;
  user_id: string | null;
  company_url: string;
  position: string;
  total_visitors: string;
}

export async function storeOnboardingInfo({
  name,
  user_id,
  company_url,
  position,
  total_visitors,
}: Info) {
  const result = await auth.api.getSession({
    headers: await headers(),
  });

  if (!result?.session?.userId) {
    redirect("/sign-in");
  }
  try {
    const data = await db
      .insert(onboarding_info)
      .values({
        name,
        user_id: user_id ?? result.session.userId,
        company_url,
        position,
        total_visitors,
      })
      .returning();

    return {
      statusSuccess: true,
      storedInfo: data,
    };
  } catch (error) {
    return {
      statusSuccess: false,
      error,
    };
  }
}
