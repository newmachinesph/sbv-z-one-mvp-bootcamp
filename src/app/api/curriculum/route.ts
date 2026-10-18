import { NextResponse } from "next/server";
import { weeks } from "@/app/program/program-data";

export async function GET() {
  return NextResponse.json(weeks);
}
