import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseTeamStatus } from "@/lib/validations";

export async function GET() {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const teams = await prisma.team.findMany({
      include: {
        members: {
          select: {
            id: true, name: true, email: true, role: true,
            avatar: true, skills: true, bio: true, teamId: true,
            createdAt: true, updatedAt: true,
          },
        },
        progress: { orderBy: { week: "asc" } },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(teams);
  } catch (error) {
    console.error("GET /api/admin/teams error:", error);
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
    const { name, productName, description, niche } = body;

    if (!name || !productName || !description || !niche) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    // Auto-generate a unique slug from name + random suffix
    const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const suffix = Math.random().toString(36).slice(2, 8);
    const slug = `${base}-${suffix}`;

    const team = await prisma.team.create({
      data: { slug, name, productName, description, niche },
    });

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/teams error:", error);
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
    const { id, slug, name, productName, description, niche, status, currentWeek, avatarUrl } = body;

    if (!id) {
      return NextResponse.json({ error: "Team id required" }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    if (slug !== undefined) data.slug = slug;
    if (name !== undefined) data.name = name;
    if (productName !== undefined) data.productName = productName;
    if (description !== undefined) data.description = description;
    if (niche !== undefined) data.niche = niche;
    if (currentWeek !== undefined) data.currentWeek = currentWeek;
    if (avatarUrl !== undefined) data.avatarUrl = avatarUrl;

    if (status !== undefined) {
      const parsed = parseTeamStatus(status);
      if (!parsed) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      data.status = parsed;
    }

    const team = await prisma.team.update({
      where: { id },
      data,
    });

    return NextResponse.json(team);
  } catch (error) {
    console.error("PATCH /api/admin/teams error:", error);
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
      return NextResponse.json({ error: "Team id required" }, { status: 400 });
    }

    await prisma.team.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("DELETE /api/admin/teams error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
