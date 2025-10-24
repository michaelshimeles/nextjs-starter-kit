import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { forms, formCriteria, auditLogs } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { calculateTotalScore, classifyProfile } from "@/lib/spe-m-criteria";

// POST /api/forms/[id]/finalize - Finalize form (lock for editing)
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

    if (existingForm[0].status === "finalized") {
      return NextResponse.json(
        { error: "Form is already finalized" },
        { status: 400 }
      );
    }

    // Get all criteria to recalculate score
    const criteria = await db
      .select()
      .from(formCriteria)
      .where(eq(formCriteria.formId, id));

    // Calculate final score
    const criteriaData = criteria.map((c) => ({
      criterionNumber: c.criterionNumber,
      data: (c.data as Record<string, string>) || {},
    }));

    const totalScore = calculateTotalScore(criteriaData);
    const profile = classifyProfile(totalScore);

    // Update form to finalized status
    await db
      .update(forms)
      .set({
        status: "finalized",
        totalScore: totalScore.toString(),
        profileClassification: profile.classification,
        finalizedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(forms.id, id));

    // Create audit log
    await db.insert(auditLogs).values({
      id: nanoid(),
      userId: session.user.id,
      action: "update",
      entityType: "form",
      entityId: id,
      ipAddress: request.ip || null,
      userAgent: request.headers.get("user-agent") || null,
      metadata: { action: "finalized", totalScore, classification: profile.classification },
      timestamp: new Date(),
    });

    return NextResponse.json({
      message: "Form finalized successfully",
      totalScore,
      profileClassification: profile,
    });
  } catch (error) {
    console.error("Error finalizing form:", error);
    return NextResponse.json(
      { error: "Failed to finalize form" },
      { status: 500 }
    );
  }
}
