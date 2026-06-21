import { NextRequest, NextResponse } from "next/server";
import { createInspiration, getInspirations } from "@/lib/db/inspirations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ inspirations: getInspirations() });
}

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload.title !== "string" || !payload.title.trim()) {
    return NextResponse.json({ error: "标题不能为空" }, { status: 400 });
  }

  const inspiration = createInspiration({
    title: payload.title,
    note: payload.note,
    moodTags: payload.moodTags,
    imageUrl: payload.imageUrl,
    recipeBackup: payload.recipeBackup
  });

  return NextResponse.json({ inspiration }, { status: 201 });
}
