import { NextResponse } from "next/server";
import { getLeaderboard } from "@/lib/data";

export async function GET() {
  try {
    const teams = await getLeaderboard();
    return NextResponse.json(teams);
  } catch (error) {
    console.error("GET /api/leaderboard error:", error);
    return NextResponse.json({ error: "Failed to fetch leaderboard." }, { status: 500 });
  }
}
