"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const template = async () => {
  const supabase = createServerComponentClient({ cookies });

  try {
    let { data: user, error } = await supabase.from("user").select("*");

    if (user) return user;

    if (error) return error;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
