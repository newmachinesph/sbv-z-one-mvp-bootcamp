import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { parseMemberRole } from "@/lib/validations";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: teamId } = await params;
    const body = await request.json();
    const { name, email, role, skills, bio, password } = body;

    if (!name || !email || !role || !bio) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const parsedRole = parseMemberRole(role);
    if (!parsedRole) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    if (password && password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const member = await prisma.teamMember.create({
      data: {
        name,
        email,
        role: parsedRole,
        skills: skills || [],
        bio,
        password: password ? await hash(password, 10) : null,
        teamId,
      },
    });

    const { password: _, ...memberWithoutPassword } = member;
    return NextResponse.json(memberWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/teams/[id]/members error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: teamId } = await params;
    const body = await request.json();
    const { memberId, name, email, role, skills, bio, password, avatar } = body;

    if (!memberId) {
      return NextResponse.json({ error: "memberId required" }, { status: 400 });
    }

    const existingMember = await prisma.teamMember.findUnique({ where: { id: memberId } });
    if (!existingMember || existingMember.teamId !== teamId) {
      return NextResponse.json({ error: "Member not found in this team" }, { status: 404 });
    }

    const data: Record<string, unknown> = {};
    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (skills !== undefined) data.skills = skills;
    if (bio !== undefined) data.bio = bio;
    if (avatar !== undefined) data.avatar = avatar;

    if (role !== undefined) {
      const parsedRole = parseMemberRole(role);
      if (!parsedRole) {
        return NextResponse.json({ error: "Invalid role" }, { status: 400 });
      }
      data.role = parsedRole;
    }

    if (password !== undefined) {
      if (password.length < 8) {
        return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
      }
      data.password = await hash(password, 10);
    }

    const member = await prisma.teamMember.update({
      where: { id: memberId },
      data,
    });

    const { password: _, ...memberWithoutPassword } = member;
    return NextResponse.json(memberWithoutPassword);
  } catch (error) {
    console.error("PATCH /api/admin/teams/[id]/members error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id: teamId } = await params;
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get("memberId");

    if (!memberId) {
      return NextResponse.json({ error: "memberId required" }, { status: 400 });
    }

    const existingMember = await prisma.teamMember.findUnique({ where: { id: memberId } });
    if (!existingMember || existingMember.teamId !== teamId) {
      return NextResponse.json({ error: "Member not found in this team" }, { status: 404 });
    }

    await prisma.teamMember.delete({ where: { id: memberId } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("DELETE /api/admin/teams/[id]/members error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
