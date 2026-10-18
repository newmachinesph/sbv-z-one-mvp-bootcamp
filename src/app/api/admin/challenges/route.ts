import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const challenges = await prisma.challenge.findMany({
      orderBy: { week: "asc" },
    });

    return NextResponse.json(challenges);
  } catch (error) {
    console.error("GET /api/admin/challenges error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { week, name, description, tests } = body;

    if (!week || !name || !description || !tests) {
      return NextResponse.json({ error: "week, name, description, and tests required" }, { status: 400 });
    }

    const challenge = await prisma.challenge.create({
      data: { week, name, description, tests },
    });
    return NextResponse.json(challenge, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/challenges error:", error);
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
    const { id, week, name, description, tests, winner } = body;

    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    if (week !== undefined) data.week = week;
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (tests !== undefined) data.tests = tests;
    if (winner !== undefined) data.winner = winner;

    const challenge = await prisma.challenge.update({
      where: { id },
      data,
    });

    return NextResponse.json(challenge);
  } catch (error) {
    console.error("PATCH /api/admin/challenges error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
