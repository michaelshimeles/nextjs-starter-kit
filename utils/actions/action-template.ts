"use server";

import { auth } from "@clerk/nextjs/server";

export async function actionTemplate() {
  const { userId } = auth();

  if (!userId) {
    return "You must be signed in";
  }

  return
}
