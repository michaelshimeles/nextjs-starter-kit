import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { forms, formImages, auditLogs } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { uploadImage } from "@/lib/upload-image";

// POST /api/forms/[id]/images - Upload image for form
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if form exists and belongs to user
    const existingForm = await db
      .select()
      .from(forms)
      .where(and(eq(forms.id, id), eq(forms.userId, session.user.id)))
      .limit(1);

    if (existingForm.length === 0) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const imageType = formData.get("imageType") as string;

    if (!file || !imageType) {
      return NextResponse.json(
        { error: "File and image type are required" },
        { status: 400 }
      );
    }

    // Validate image type
    const validImageTypes = [
      "frontal",
      "profile_right",
      "profile_left",
      "oblique_right",
      "oblique_left",
      "base",
    ];

    if (!validImageTypes.includes(imageType)) {
      return NextResponse.json(
        { error: "Invalid image type" },
        { status: 400 }
      );
    }

    // Check if image of this type already exists for this form
    const existingImage = await db
      .select()
      .from(formImages)
      .where(
        and(eq(formImages.formId, id), eq(formImages.imageType, imageType))
      )
      .limit(1);

    // Upload to R2 storage
    const imageUrl = await uploadImage(file, `spe-m/${id}/${imageType}`);

    const imageId = nanoid();
    const imageData = {
      id: imageId,
      formId: id,
      imageType,
      storageUrl: imageUrl,
      thumbnailUrl: null, // TODO: Generate thumbnail
      annotations: null,
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      },
      uploadedAt: new Date(),
      updatedAt: new Date(),
    };

    // If image exists, update it; otherwise insert
    if (existingImage.length > 0) {
      await db
        .update(formImages)
        .set({
          storageUrl: imageUrl,
          metadata: imageData.metadata,
          updatedAt: new Date(),
        })
        .where(eq(formImages.id, existingImage[0].id));
    } else {
      await db.insert(formImages).values(imageData);
    }

    // Create audit log
    await db.insert(auditLogs).values({
      id: nanoid(),
      userId: session.user.id,
      action: "create",
      entityType: "image",
      entityId: imageId,
      ipAddress: request.ip || null,
      userAgent: request.headers.get("user-agent") || null,
      metadata: { formId: id, imageType },
      timestamp: new Date(),
    });

    return NextResponse.json(
      { image: existingImage.length > 0 ? existingImage[0] : imageData },
      { status: existingImage.length > 0 ? 200 : 201 }
    );
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

// PUT /api/forms/[id]/images - Update image annotations
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { imageId, annotations } = body;

    if (!imageId || !annotations) {
      return NextResponse.json(
        { error: "Image ID and annotations are required" },
        { status: 400 }
      );
    }

    // Check if image exists and belongs to user's form
    const existingImage = await db
      .select({
        image: formImages,
        form: forms,
      })
      .from(formImages)
      .leftJoin(forms, eq(formImages.formId, forms.id))
      .where(
        and(eq(formImages.id, imageId), eq(forms.userId, session.user.id))
      )
      .limit(1);

    if (existingImage.length === 0) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Update annotations
    await db
      .update(formImages)
      .set({
        annotations,
        updatedAt: new Date(),
      })
      .where(eq(formImages.id, imageId));

    // Create audit log
    await db.insert(auditLogs).values({
      id: nanoid(),
      userId: session.user.id,
      action: "update",
      entityType: "image",
      entityId: imageId,
      ipAddress: request.ip || null,
      userAgent: request.headers.get("user-agent") || null,
      metadata: { action: "annotations_updated" },
      timestamp: new Date(),
    });

    return NextResponse.json({ message: "Annotations updated successfully" });
  } catch (error) {
    console.error("Error updating annotations:", error);
    return NextResponse.json(
      { error: "Failed to update annotations" },
      { status: 500 }
    );
  }
}
