import { uploadImageAssets } from "@/lib/upload-image";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: { bodyParser: false }, // Disable default body parsing
};

export async function POST(req: NextRequest) {
  try {
    // Parse the form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate MIME type - only allow image files
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

    // Validate file size - limit to 10MB
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeInBytes) {
      return NextResponse.json(
        { error: "File too large. Maximum size allowed is 10MB." },
        { status: 400 },
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate a unique filename with original extension
    const fileExt = file.name.split(".").pop() || "";
    const timestamp = Date.now();
    const filename = `upload-${timestamp}.${fileExt || "png"}`;

    // Upload the file
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
