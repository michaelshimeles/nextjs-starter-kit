"server only";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export const authCheck = async () => {
  const result = await auth.api.getSession({
    headers: await headers(),
  });

  if (!result?.session?.userId) {
    return {
      userId: null,
      result,
    };
  }

  return {
    userId: result.session.userId,
    result,
  };
};
