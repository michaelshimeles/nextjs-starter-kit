"server only";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import config from "@/tailwind.config";
import { clerkClient } from "@clerk/nextjs/server";

export const isAuthorized = async (
  userId: string
): Promise<{ authorized: boolean; message: string }> => {
  if (!config?.payments?.enabled) {
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
    const data = await db.select().from(users);

    // const { data, error } = await supabase
    //   .from("subscriptions")
    //   .select("*")
    //   .eq("user_id", userId);

    // if (error?.code)
    //   return {
    //     authorized: false,
    //     message: error.message,
    //   };

    // if (data && data[0].status === "active") {
    //   return {
    //     authorized: true,
    //     message: "User is subscribed",
    //   };
    // }

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
