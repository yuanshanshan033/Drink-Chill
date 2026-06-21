import { NextRequest, NextResponse } from "next/server";
import { recommendDrinks } from "@/lib/recommendations";

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => ({}));
  const moodText = typeof payload.moodText === "string" ? payload.moodText : "";
  const tags = Array.isArray(payload.tags)
    ? payload.tags.filter((tag: unknown) => typeof tag === "string")
    : [];

  return NextResponse.json(recommendDrinks({ moodText, tags }));
}
