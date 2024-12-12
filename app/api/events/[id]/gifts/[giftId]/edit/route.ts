import { NextResponse } from "next/server";
import { giftEdit } from "@/utils/data/gift/giftEdit";

export async function PATCH(
  request: Request,
  context: { params: { id: string; giftId: string } }
) {
  const params = await context.params;
  const eventId = params.id;
  const giftId = params.giftId;

  try {
    const giftData = await request.json();
    const { data, error } = await giftEdit({
      eventId,
      giftId,
      giftData
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