import { NextRequest, NextResponse } from "next/server";
import {
  deleteInspiration,
  updateInspiration
} from "@/lib/db/inspirations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const numericId = Number(id);
  const payload = await request.json().catch(() => null);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return NextResponse.json({ error: "无效记录 ID" }, { status: 400 });
  }

  if (!payload || typeof payload.title !== "string" || !payload.title.trim()) {
    return NextResponse.json({ error: "标题不能为空" }, { status: 400 });
  }

  const inspiration = updateInspiration(numericId, {
    title: payload.title,
    note: payload.note,
    moodTags: payload.moodTags,
    imageUrl: payload.imageUrl,
    recipeBackup: payload.recipeBackup
  });

  if (!inspiration) {
    return NextResponse.json({ error: "记录不存在" }, { status: 404 });
  }

  return NextResponse.json({ inspiration });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return NextResponse.json({ error: "无效记录 ID" }, { status: 400 });
  }

  deleteInspiration(numericId);
  return NextResponse.json({ ok: true });
}
