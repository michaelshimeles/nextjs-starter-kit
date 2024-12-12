import { NextResponse } from "next/server";
import { giftReserve } from "@/utils/data/gift/giftReserve";

export async function POST(
  request: Request,
  context: { params: { id: string; giftId: string } }
) {
  const params = await context.params;
  const eventId = params.id;
  const giftId = params.giftId;

  try {
    const { is_reserved } = await request.json();
    const { data, error } = await giftReserve({
      eventId,
      giftId,
      isReserved: is_reserved
    });

    if (error) {
      return NextResponse.json(
        { status: 400, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ status: 200, data });
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, error: error.message },
      { status: 500 }
    );
  }
}