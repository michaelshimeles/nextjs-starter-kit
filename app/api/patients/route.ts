import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { patients, auditLogs } from "@/db/schema";
import { eq, and, isNull, desc, or, ilike } from "drizzle-orm";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

// GET /api/patients - List all patients for current user
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Build query
    let query = db
      .select()
      .from(patients)
      .where(
        and(
          eq(patients.userId, session.user.id),
          isNull(patients.deletedAt) // Soft delete filter
        )
      )
      .orderBy(desc(patients.createdAt))
      .limit(limit)
      .offset(offset);

    // Add search filter if provided
    if (search) {
      query = db
        .select()
        .from(patients)
        .where(
          and(
            eq(patients.userId, session.user.id),
            isNull(patients.deletedAt),
            or(
              ilike(patients.name, `%${search}%`),
              ilike(patients.cpf, `%${search}%`),
              ilike(patients.email, `%${search}%`)
            )
          )
        )
        .orderBy(desc(patients.createdAt))
        .limit(limit)
        .offset(offset);
    }

    const patientsList = await query;

    return NextResponse.json({ patients: patientsList });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

// POST /api/patients - Create new patient
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, cpf, birthDate, phone, email, address, notes } = body;

    // Validation
    if (!name || !cpf) {
      return NextResponse.json(
        { error: "Name and CPF are required" },
        { status: 400 }
      );
    }

    // Check if CPF already exists for this user
    const existingPatient = await db
      .select()
      .from(patients)
      .where(
        and(
          eq(patients.cpf, cpf),
          eq(patients.userId, session.user.id),
          isNull(patients.deletedAt)
        )
      )
      .limit(1);

    if (existingPatient.length > 0) {
      return NextResponse.json(
        { error: "A patient with this CPF already exists" },
        { status: 409 }
      );
    }

    // Create patient
    const patientId = nanoid();
    const newPatient = {
      id: patientId,
      name,
      cpf,
      birthDate: birthDate ? new Date(birthDate) : null,
      phone: phone || null,
      email: email || null,
      address: address || null,
      notes: notes || null,
      userId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(patients).values(newPatient);

    // Create audit log
    await db.insert(auditLogs).values({
      id: nanoid(),
      userId: session.user.id,
      action: "create",
      entityType: "patient",
      entityId: patientId,
      ipAddress: request.ip || null,
      userAgent: request.headers.get("user-agent") || null,
      metadata: { name, cpf },
      timestamp: new Date(),
    });

    return NextResponse.json({ patient: newPatient }, { status: 201 });
  } catch (error) {
    console.error("Error creating patient:", error);
    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    );
  }
}
