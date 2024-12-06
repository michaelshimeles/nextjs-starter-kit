import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function PATCH(
  req: Request,
  context: { params: { id: string; giftId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Nieautoryzowany dostęp" },
        { status: 401 }
      );
    }

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

    const { id, giftId } = context.params;
    const payload = await req.json();
    
    const { data: event } = await supabase
      .from("event")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!event || event.user_id !== userId) {
      return NextResponse.json(
        { status: 403, message: "Brak uprawnień do edycji tego prezentu" },
        { status: 403 }
      );
    }

    const { data, error } = await supabase
      .from("gift")
      .update({
        name: payload.name,
        store: payload.store,
      })
      .eq("id", giftId)
      .eq("event_id", id)
      .select();

    if (error) {
      return NextResponse.json(
        { status: 400, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ status: 200, data });
  } catch (error: any) {
    return NextResponse.json(
      { status: 400, message: error.message },
      { status: 400 }
    );
  }
} 