import { ratelimit } from "@/lib/ratelimiter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const ip = req.ip ?? "127.0.0.1";
  const isLocal = process.env.NODE_ENV === "development";
  const country = isLocal ? "CA" : req.geo?.country ?? "unknown";

  const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip, {
    country: country
  });

  if (!success) {
    // console.log("limit", limit);
    // console.log("reset", reset);
    // console.log("remaining", remaining);

    return NextResponse.json("Rate Limited", { status: 429 });
  }
  return NextResponse.json("Success", { status: 200 });
}
