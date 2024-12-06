import { eventCreate } from "@/utils/data/event/eventCreate";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = await req.json();
    console.log('Otrzymany payload:', payload);

    const result = await eventCreate({ ...payload, userId });
    console.log('Wynik eventCreate:', result);

    if (result.error) {
      console.error('Błąd podczas tworzenia eventu:', result.error);
      return NextResponse.json(
        { status: 400, message: result.error.message },
        { status: 400 }
      );
    }

    if (result.data?.[0]?.id) {
      return NextResponse.json({ 
        status: 200, 
        data: result.data,
        redirectUrl: `/dashboard/events/${result.data[0].id}` 
      });
    }

    return NextResponse.json({ status: 200, data: result.data });
  } catch (error: any) {
    console.error('Nieoczekiwany błąd:', error);
    return NextResponse.json(
      { status: 400, message: error.message },
      { status: 400 }
    );
  }
}

export async function GET() {
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
      .from("event")
      .select("*")
      .eq("user_id", userId)
      .order("event_date", { ascending: true });

      if (error) throw error;
      
    return NextResponse.json({ status: 200, data });
  } catch (error: any) {
    return NextResponse.json(
      { status: 400, error: error.message },
      { status: 400 }
    );
  }
}