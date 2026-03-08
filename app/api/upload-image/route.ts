import { db } from "@/db/drizzle";
import { userImage } from "@/db/schema";
import { createRouteHandler } from "@/lib/routeHandler";
import { uploadImageAssets } from "@/lib/upload-image";
import { NextResponse } from "next/server";

export const config = {
  api: { bodyParser: false },
};

export const POST = createRouteHandler(
  { isAuthenticated: true },
  async (req) => {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];

    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only image files are allowed." },
        { status: 400 },
      );
    }

    const maxSizeInBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return NextResponse.json(
        { error: "File too large. Maximum size allowed is 10MB." },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileExt = file.name.split(".").pop() || "";
    const timestamp = Date.now();
    const filename = `upload-${timestamp}.${fileExt || "png"}`;

    const url = await uploadImageAssets(buffer, filename);

    await db.insert(userImage).values({
      id: crypto.randomUUID(),
      url,
      filename,
      userId: req.user.id,
    });

    return NextResponse.json({ url });
  },
);
