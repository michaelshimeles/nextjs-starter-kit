import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(
  req: Request,
  context: { params: { id: string, giftId: string } }
) {
  const { id: eventId, giftId } = context.params;

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

    const { is_reserved } = await req.json();

    const { data, error } = await supabase
      .from("gift")
      .update({ is_reserved })
      .eq("id", giftId)
      .eq("event_id", eventId)
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json({ status: 200, data });
  } catch (error: any) {
    return NextResponse.json(
      { status: 400, error: error.message },
      { status: 400 }
    );
  }
}