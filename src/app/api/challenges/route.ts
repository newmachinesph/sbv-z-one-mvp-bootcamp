import { NextResponse } from "next/server";
import { getChallenges } from "@/lib/data";

export async function GET() {
  try {
    const challenges = await getChallenges();
    return NextResponse.json(challenges);
  } catch (error) {
    console.error("GET /api/challenges error:", error);
    return NextResponse.json({ error: "Failed to fetch challenges." }, { status: 500 });
  }
}
