"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

interface GiftReserveProps {
  eventId: string;
  giftId: string;
  isReserved: boolean;
}

export const giftReserve = async ({
  eventId,
  giftId,
  isReserved
}: GiftReserveProps) => {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data, error } = await supabase
      .from("gift")
      .update({ is_reserved: isReserved })
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