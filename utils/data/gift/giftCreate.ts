"server only";

import { createServerClient } from "@supabase/ssr";
import { GiftCreateProps } from "@/utils/types";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from 'uuid';

export const giftCreate = async ({
  name,
  price,
  store,
  event_id,
}: GiftCreateProps) => {
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

  const giftId = uuidv4();

  try {
    const { data, error } = await supabase
      .from("gift")
      .insert([
        {
          id: giftId,
          name,
          price: parseFloat(price.toString()),
          store,
          event_id,
          is_reserved: false,
        },
      ])
      .select();

    if (error?.code) return { error };
    return { data };
  } catch (error: any) {
    throw new Error(error.message);
  }
}; 