"server only";

import config from "@/config";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const isAuthorized = async (
  userId: string
): Promise<{ authorized: boolean; message: string }> => {
  console.log("GET HIT")
  if (!config?.payments?.enabled) {
    console.log("Payments are disabled")
    return {
      authorized: true,
      message: "Payments are disabled",
    };
  }

  const result = (await clerkClient()).users.getUser(userId);

  if (!result) {
    return {
      authorized: false,
      message: "User not found",
    };
  }

  try {
    const data = await db.select().from(users).where(eq(users.userId, userId));

    if (data?.[0]?.subscription) {
      return {
        authorized: true,
        message: "User is authorized",
      };
    }

    return {
      authorized: false,
      message: "User is not subscribed",
    };
  } catch (error: any) {
    return {
      authorized: false,
      message: error.message,
    };
  }
};
