import { NextResponse } from "next/server";
import { getTeams } from "@/lib/data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const teams = await getTeams(status);
    return NextResponse.json(teams);
  } catch (error) {
    console.error("GET /api/teams error:", error);
    return NextResponse.json({ error: "Failed to fetch teams." }, { status: 500 });
  }
}
