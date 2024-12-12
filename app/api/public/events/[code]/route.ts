import { NextResponse } from "next/server";
import { eventGetByCode } from "@/utils/data/event/eventGetByCode";

export async function GET(
  _request: Request,
  context: { params: { code: string } }
) {
  const params = await context.params;
  const code = params.code;

  try {
    const { event, gifts } = await eventGetByCode(code);
    return NextResponse.json({ event, gifts });
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, error: error.message },
      { status: 500 }
    );
  }
} 