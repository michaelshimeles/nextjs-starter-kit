import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { patients, auditLogs } from "@/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

// GET /api/patients/[id] - Get single patient
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

    const patient = await db
      .select()
      .from(patients)
      .where(
        and(
          eq(patients.id, id),
          eq(patients.userId, session.user.id),
          isNull(patients.deletedAt)
        )
      )
      .limit(1);

    if (patient.length === 0) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    // Create audit log for read operation
    await db.insert(auditLogs).values({
      id: nanoid(),
      userId: session.user.id,
      action: "read",
      entityType: "patient",
      entityId: id,
      ipAddress: request.ip || null,
      userAgent: request.headers.get("user-agent") || null,
      metadata: null,
      timestamp: new Date(),
    });

    return NextResponse.json({ patient: patient[0] });
  } catch (error) {
    console.error("Error fetching patient:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient" },
      { status: 500 }
    );
  }
}

// PUT /api/patients/[id] - Update patient
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
    const { name, cpf, birthDate, phone, email, address, notes } = body;

    // Check if patient exists and belongs to user
    const existingPatient = await db
      .select()
      .from(patients)
      .where(
        and(
          eq(patients.id, id),
          eq(patients.userId, session.user.id),
          isNull(patients.deletedAt)
        )
      )
      .limit(1);

    if (existingPatient.length === 0) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    // Update patient
    const updatedData = {
      name: name || existingPatient[0].name,
      cpf: cpf || existingPatient[0].cpf,
      birthDate: birthDate ? new Date(birthDate) : existingPatient[0].birthDate,
      phone: phone !== undefined ? phone : existingPatient[0].phone,
      email: email !== undefined ? email : existingPatient[0].email,
      address: address !== undefined ? address : existingPatient[0].address,
      notes: notes !== undefined ? notes : existingPatient[0].notes,
      updatedAt: new Date(),
    };

    await db
      .update(patients)
      .set(updatedData)
      .where(eq(patients.id, id));

    // Create audit log
    await db.insert(auditLogs).values({
      id: nanoid(),
      userId: session.user.id,
      action: "update",
      entityType: "patient",
      entityId: id,
      ipAddress: request.ip || null,
      userAgent: request.headers.get("user-agent") || null,
      metadata: { changes: body },
      timestamp: new Date(),
    });

    return NextResponse.json({
      patient: { ...existingPatient[0], ...updatedData }
    });
  } catch (error) {
    console.error("Error updating patient:", error);
    return NextResponse.json(
      { error: "Failed to update patient" },
      { status: 500 }
    );
  }
}

// DELETE /api/patients/[id] - Soft delete patient
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

    // Check if patient exists and belongs to user
    const existingPatient = await db
      .select()
      .from(patients)
      .where(
        and(
          eq(patients.id, id),
          eq(patients.userId, session.user.id),
          isNull(patients.deletedAt)
        )
      )
      .limit(1);

    if (existingPatient.length === 0) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    // Soft delete (LGPD compliance - maintain data for 20 years)
    await db
      .update(patients)
      .set({ deletedAt: new Date() })
      .where(eq(patients.id, id));

    // Create audit log
    await db.insert(auditLogs).values({
      id: nanoid(),
      userId: session.user.id,
      action: "delete",
      entityType: "patient",
      entityId: id,
      ipAddress: request.ip || null,
      userAgent: request.headers.get("user-agent") || null,
      metadata: { name: existingPatient[0].name },
      timestamp: new Date(),
    });

    return NextResponse.json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    return NextResponse.json(
      { error: "Failed to delete patient" },
      { status: 500 }
    );
  }
}
