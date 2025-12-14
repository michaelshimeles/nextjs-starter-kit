import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { forms, formCriteria, patients, auditLogs } from "@/db/schema";
import { eq, and, isNull, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

// GET /api/forms - List all forms for current user
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("patientId");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Build query with patient info
    let query = db
      .select({
        form: forms,
        patient: {
          id: patients.id,
          name: patients.name,
          cpf: patients.cpf,
        },
      })
      .from(forms)
      .leftJoin(patients, eq(forms.patientId, patients.id))
      .where(eq(forms.userId, session.user.id))
      .orderBy(desc(forms.createdAt))
      .limit(limit)
      .offset(offset);

    // Add filters
    if (patientId) {
      query = db
        .select({
          form: forms,
          patient: {
            id: patients.id,
            name: patients.name,
            cpf: patients.cpf,
          },
        })
        .from(forms)
        .leftJoin(patients, eq(forms.patientId, patients.id))
        .where(
          and(
            eq(forms.userId, session.user.id),
            eq(forms.patientId, patientId)
          )
        )
        .orderBy(desc(forms.createdAt))
        .limit(limit)
        .offset(offset);
    }

    if (status) {
      query = db
        .select({
          form: forms,
          patient: {
            id: patients.id,
            name: patients.name,
            cpf: patients.cpf,
          },
        })
        .from(forms)
        .leftJoin(patients, eq(forms.patientId, patients.id))
        .where(
          and(
            eq(forms.userId, session.user.id),
            eq(forms.status, status)
          )
        )
        .orderBy(desc(forms.createdAt))
        .limit(limit)
        .offset(offset);
    }

    const formsList = await query;

    return NextResponse.json({ forms: formsList });
  } catch (error) {
    console.error("Error fetching forms:", error);
    return NextResponse.json(
      { error: "Failed to fetch forms" },
      { status: 500 }
    );
  }
}

// POST /api/forms - Create new form
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { patientId, generalNotes } = body;

    // Validation
    if (!patientId) {
      return NextResponse.json(
        { error: "Patient ID is required" },
        { status: 400 }
      );
    }

    // Verify patient belongs to user
    const patient = await db
      .select()
      .from(patients)
      .where(
        and(
          eq(patients.id, patientId),
          eq(patients.userId, session.user.id),
          isNull(patients.deletedAt)
        )
      )
      .limit(1);

    if (patient.length === 0) {
      return NextResponse.json(
        { error: "Patient not found" },
        { status: 404 }
      );
    }

    // Create form
    const formId = nanoid();
    const newForm = {
      id: formId,
      patientId,
      userId: session.user.id,
      status: "draft",
      generalNotes: generalNotes || null,
      totalScore: null,
      profileClassification: null,
      recommendations: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      finalizedAt: null,
      version: 1,
    };

    await db.insert(forms).values(newForm);

    // Initialize 8 empty criteria
    const criteriaPromises = Array.from({ length: 8 }, (_, i) => {
      const criterionNumber = i + 1;
      return db.insert(formCriteria).values({
        id: nanoid(),
        formId,
        criterionNumber,
        criterionName: `Criterion ${criterionNumber}`,
        data: {},
        score: null,
        notes: null,
        recommendations: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await Promise.all(criteriaPromises);

    // Create audit log
    await db.insert(auditLogs).values({
      id: nanoid(),
      userId: session.user.id,
      action: "create",
      entityType: "form",
      entityId: formId,
      ipAddress: request.ip || null,
      userAgent: request.headers.get("user-agent") || null,
      metadata: { patientId },
      timestamp: new Date(),
    });

    return NextResponse.json({ form: newForm }, { status: 201 });
  } catch (error) {
    console.error("Error creating form:", error);
    return NextResponse.json(
      { error: "Failed to create form" },
      { status: 500 }
    );
  }
}
