import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  const code = params.code;
  const resolvedCode = await Promise.resolve(code);

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

    const { data: event, error: eventError } = await supabase
      .from("event")
      .select("*")
      .eq("short_code", resolvedCode)
      .single();

    if (eventError) throw eventError;

    const { data: gifts, error: giftsError } = await supabase
      .from("gift")
      .select("*")
      .eq("event_id", event.id);

    if (giftsError) throw giftsError;

    return NextResponse.json({ event, gifts });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Nie znaleziono wydarzenia" },
      { status: 404 }
    );
  }
} 