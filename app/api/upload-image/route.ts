import { uploadImageAssets } from "@/lib/upload-image";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ensures Buffer + many SDKs work (not Edge)

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedMimeTypes = new Set([
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ]);

    if (!allowedMimeTypes.has(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only image files are allowed." },
        { status: 400 },
      );
    }

    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeInBytes) {
      return NextResponse.json(
        { error: "File too large. Maximum size allowed is 10MB." },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // extension (very light sanitization)
    const rawExt = file.name.split(".").pop()?.toLowerCase() ?? "";
    const safeExt = rawExt.match(/^[a-z0-9]+$/) ? rawExt : "png";

    const filename = `upload-${Date.now()}.${safeExt}`;

    const url = await uploadImageAssets(buffer, filename);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 },
    );
  }
}
