import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { forms, formCriteria, formImages, patients, auditLogs } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { calculateTotalScore, classifyProfile } from "@/lib/spe-m-criteria";

// GET /api/forms/[id] - Get single form with all data
export async function GET(
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

    // Get form with patient info
    const formData = await db
      .select({
        form: forms,
        patient: patients,
      })
      .from(forms)
      .leftJoin(patients, eq(forms.patientId, patients.id))
      .where(and(eq(forms.id, id), eq(forms.userId, session.user.id)))
      .limit(1);

    if (formData.length === 0) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    // Get all criteria
    const criteria = await db
      .select()
      .from(formCriteria)
      .where(eq(formCriteria.formId, id))
      .orderBy(formCriteria.criterionNumber);

    // Get all images
    const images = await db
      .select()
      .from(formImages)
      .where(eq(formImages.formId, id))
      .orderBy(formImages.uploadedAt);

    // Create audit log for read operation
    await db.insert(auditLogs).values({
      id: nanoid(),
      userId: session.user.id,
      action: "read",
      entityType: "form",
      entityId: id,
      ipAddress: request.ip || null,
      userAgent: request.headers.get("user-agent") || null,
      metadata: null,
      timestamp: new Date(),
    });

    return NextResponse.json({
      form: formData[0].form,
      patient: formData[0].patient,
      criteria,
      images,
    });
  } catch (error) {
    console.error("Error fetching form:", error);
    return NextResponse.json(
      { error: "Failed to fetch form" },
      { status: 500 }
    );
  }
}

// PUT /api/forms/[id] - Update form
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
    const { generalNotes, recommendations, criteria } = body;

    // Check if form exists and belongs to user
    const existingForm = await db
      .select()
      .from(forms)
      .where(and(eq(forms.id, id), eq(forms.userId, session.user.id)))
      .limit(1);

    if (existingForm.length === 0) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    // Check if form is finalized (should not be editable)
    if (existingForm[0].status === "finalized") {
      return NextResponse.json(
        { error: "Cannot edit a finalized form" },
        { status: 400 }
      );
    }

    // Update criteria if provided
    if (criteria && Array.isArray(criteria)) {
      const updatePromises = criteria.map((criterion: any) => {
        return db
          .update(formCriteria)
          .set({
            data: criterion.data,
            score: criterion.score,
            notes: criterion.notes || null,
            recommendations: criterion.recommendations || null,
            updatedAt: new Date(),
          })
          .where(
            and(
              eq(formCriteria.formId, id),
              eq(formCriteria.criterionNumber, criterion.criterionNumber)
            )
          );
      });
      await Promise.all(updatePromises);
    }

    // Calculate total score
    let totalScore = null;
    let profileClassification = null;

    if (criteria && Array.isArray(criteria)) {
      totalScore = calculateTotalScore(
        criteria.map((c: any) => ({
          criterionNumber: c.criterionNumber,
          data: c.data,
        }))
      );

      const profile = classifyProfile(totalScore);
      profileClassification = profile.classification;
    }

    // Update form
    const updatedData = {
      generalNotes: generalNotes !== undefined ? generalNotes : existingForm[0].generalNotes,
      recommendations: recommendations !== undefined ? recommendations : existingForm[0].recommendations,
      totalScore: totalScore !== null ? totalScore.toString() : existingForm[0].totalScore,
      profileClassification: profileClassification || existingForm[0].profileClassification,
      updatedAt: new Date(),
    };

    await db.update(forms).set(updatedData).where(eq(forms.id, id));

    // Create audit log
    await db.insert(auditLogs).values({
      id: nanoid(),
      userId: session.user.id,
      action: "update",
      entityType: "form",
      entityId: id,
      ipAddress: request.ip || null,
      userAgent: request.headers.get("user-agent") || null,
      metadata: { changes: body },
      timestamp: new Date(),
    });

    return NextResponse.json({
      form: { ...existingForm[0], ...updatedData },
    });
  } catch (error) {
    console.error("Error updating form:", error);
    return NextResponse.json(
      { error: "Failed to update form" },
      { status: 500 }
    );
  }
}

// DELETE /api/forms/[id] - Delete form
export async function DELETE(
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

    // Delete form (will cascade to criteria and images)
    await db.delete(forms).where(eq(forms.id, id));

    // Create audit log
    await db.insert(auditLogs).values({
      id: nanoid(),
      userId: session.user.id,
      action: "delete",
      entityType: "form",
      entityId: id,
      ipAddress: request.ip || null,
      userAgent: request.headers.get("user-agent") || null,
      metadata: { patientId: existingForm[0].patientId },
      timestamp: new Date(),
    });

    return NextResponse.json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form:", error);
    return NextResponse.json(
      { error: "Failed to delete form" },
      { status: 500 }
    );
  }
}
