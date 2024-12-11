import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { giftCreate } from "@/utils/data/gift/giftCreate";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized" },
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

    const { data, error } = await supabase
      .from("gift")
      .select("*")
      .eq("event_id", id);

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Nie udało się pobrać prezentów" },
      { status: 404 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized" },
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

    const { data: event, error: eventError } = await supabase
      .from("event")
      .select("user_id")
      .eq("id", id)
      .single();

    if (eventError || event.user_id !== userId) {
      return NextResponse.json(
        { status: 403, message: "Forbidden - only event owner can add gifts" },
        { status: 403 }
      );
    }

    const payload = await req.json();
    const result = await giftCreate({ ...payload, event_id: id });

    if (result.error) {
      return NextResponse.json(
        { status: 400, message: result.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ status: 200, data: result.data });
  } catch (error: any) {
    return NextResponse.json(
      { status: 400, message: error.message },
      { status: 400 }
    );
  }
}