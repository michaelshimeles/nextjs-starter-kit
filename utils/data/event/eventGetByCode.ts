"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const eventGetByCode = async (code: string) => {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );

  try {
    const { data: event, error: eventError } = await supabase
      .from("event")
      .select("*")
      .eq("short_code", code)
      .single();

    if (eventError) throw eventError;

    const { data: gifts, error: giftsError } = await supabase
      .from("gift")
      .select("*")
      .eq("event_id", event.id);

    if (giftsError) throw giftsError;

    return { event, gifts };
  } catch (error: any) {
    throw new Error(error.message);
  }
}; 