import { getDatabase } from "@/lib/db/sqlite";
import type { Inspiration } from "@/lib/types";

type InspirationRow = {
  id: number;
  title: string;
  note: string;
  mood_tags: string;
  image_url: string;
  recipe_backup: string;
  created_at: string;
  updated_at: string;
};

type InspirationInput = {
  title: string;
  note?: unknown;
  moodTags?: unknown;
  imageUrl?: unknown;
  recipeBackup?: unknown;
};

function normalizeTags(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((tag): tag is string => typeof tag === "string")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function toInspiration(row: InspirationRow): Inspiration {
  return {
    id: row.id,
    title: row.title,
    note: row.note,
    moodTags: JSON.parse(row.mood_tags || "[]"),
    imageUrl: row.image_url,
    recipeBackup: row.recipe_backup,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function getInspirations() {
  const rows = getDatabase()
    .prepare("SELECT * FROM inspirations ORDER BY updated_at DESC")
    .all() as InspirationRow[];

  return rows.map(toInspiration);
}

export function createInspiration(input: InspirationInput) {
  const now = new Date().toISOString();
  const tags = normalizeTags(input.moodTags);

  const result = getDatabase()
    .prepare(
      `INSERT INTO inspirations
        (title, note, mood_tags, image_url, recipe_backup, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      input.title.trim(),
      normalizeText(input.note),
      JSON.stringify(tags),
      normalizeText(input.imageUrl),
      normalizeText(input.recipeBackup),
      now,
      now
    );

  const row = getDatabase()
    .prepare("SELECT * FROM inspirations WHERE id = ?")
    .get(result.lastInsertRowid) as InspirationRow;

  return toInspiration(row);
}

export function updateInspiration(id: number, input: InspirationInput) {
  const now = new Date().toISOString();
  const tags = normalizeTags(input.moodTags);

  getDatabase()
    .prepare(
      `UPDATE inspirations
       SET title = ?, note = ?, mood_tags = ?, image_url = ?, recipe_backup = ?, updated_at = ?
       WHERE id = ?`
    )
    .run(
      input.title.trim(),
      normalizeText(input.note),
      JSON.stringify(tags),
      normalizeText(input.imageUrl),
      normalizeText(input.recipeBackup),
      now,
      id
    );

  const row = getDatabase()
    .prepare("SELECT * FROM inspirations WHERE id = ?")
    .get(id) as InspirationRow | undefined;

  return row ? toInspiration(row) : null;
}

export function deleteInspiration(id: number) {
  getDatabase().prepare("DELETE FROM inspirations WHERE id = ?").run(id);
}
