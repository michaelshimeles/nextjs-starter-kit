"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Gift } from "@/utils/types";

interface GiftEditProps {
  eventId: string;
  giftId: string;
  giftData: Partial<Gift>;
}

export const giftEdit = async ({
  eventId,
  giftId,
  giftData
}: GiftEditProps) => {
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
    const { data, error } = await supabase
      .from("gift")
      .update(giftData)
      .eq("id", giftId)
      .eq("event_id", eventId)
      .select()
      .single();

    if (error) throw error;
    return { data };
  } catch (error: any) {
    throw new Error(error.message);
  }
}; 