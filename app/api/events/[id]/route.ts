import { eventUpdate } from "@/utils/data/event/eventUpdate";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
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
      .from("event")
      .select("*")
      .eq("user_id", userId)
      .eq("id", id)
      .single();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Nie znaleziono wydarzenia" },
      { status: 404 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { status: 401, message: "Nieautoryzowany dostęp" },
        { status: 401 }
      );
    }

    const payload = await req.json();
    const result = await eventUpdate({ 
      ...payload, 
      eventId: id, 
      userId 
    });

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