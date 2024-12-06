"server only";

import { createServerClient } from "@supabase/ssr";
import { EventUpdateProps } from "@/utils/types";
import { cookies } from "next/headers";

export const eventUpdate = async ({
  eventId,
  userId,
  title,
  description,
  location,
  eventDate,
}: EventUpdateProps) => {
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
    // Sprawdź czy użytkownik jest właścicielem wydarzenia
    const { data: event } = await supabase
      .from("event")
      .select("user_id")
      .eq("id", eventId)
      .single();

    if (!event || event.user_id !== userId) {
      return { 
        error: { 
          message: "Brak uprawnień do edycji tego wydarzenia" 
        } 
      };
    }

    // Przygotuj obiekt z aktualizacjami, pomijając puste wartości
    const updates: any = {};
    if (title) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (location) updates.location = location;
    if (eventDate) updates.event_date = eventDate;

    const { data, error } = await supabase
      .from("event")
      .update(updates)
      .eq("id", eventId)
      .select();

    if (error) return { error };
    return { data };
  } catch (error: any) {
    return { 
      error: { 
        message: error.message 
      } 
    };
  }
};