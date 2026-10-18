import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseApplicantStatus } from "@/lib/validations";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where = status
      ? { status: parseApplicantStatus(status) ?? undefined }
      : undefined;

    if (status && !where?.status) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const applicants = await prisma.applicant.findMany({
      where,
      orderBy: { appliedAt: "desc" },
    });

    return NextResponse.json(applicants);
  } catch (error) {
    console.error("GET /api/admin/applications error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "id and status required" }, { status: 400 });
    }

    const parsedStatus = parseApplicantStatus(status);
    if (!parsedStatus) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const applicant = await prisma.applicant.update({
      where: { id },
      data: { status: parsedStatus },
    });

    return NextResponse.json(applicant);
  } catch (error) {
    console.error("PATCH /api/admin/applications error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await prisma.applicant.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/applications error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
