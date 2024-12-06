"server only";

import { createServerClient } from "@supabase/ssr";
import { EventCreateProps } from "@/utils/types";
import { cookies } from "next/headers";
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 5);

async function generateUniqueShortCode(supabase: any, maxAttempts = 5) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const shortCode = nanoid();
    const { data } = await supabase
      .from("event")
      .select("id")
      .eq("short_code", shortCode);
    
    if (!data?.length) {
      return shortCode;
    }
  }
  throw new Error("Nie udało się wygenerować unikalnego kodu");
}

export const eventCreate = async ({
  title,
  description,
  location,
  eventDate,
  userId,
}: EventCreateProps) => {
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

  try {
    const shortCode = await generateUniqueShortCode(supabase);
    const { data, error } = await supabase
      .from("event")
      .insert([
        {
          id: crypto.randomUUID(),
          short_code: shortCode,
          title,
          description,
          location,
          event_date: eventDate,
          user_id: userId,
        },
      ])
      .select();

    if (error?.code) return { error };
    return { data };
  } catch (error: any) {
    throw new Error(error.message);
  }
};