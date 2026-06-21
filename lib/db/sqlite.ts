import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const dbPath = join(process.cwd(), ".data", "drink-chill.sqlite");

let database: DatabaseSync | null = null;

export function getDatabase() {
  if (!database) {
    mkdirSync(dirname(dbPath), { recursive: true });
    database = new DatabaseSync(dbPath);
    database.exec(`
      CREATE TABLE IF NOT EXISTS inspirations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        note TEXT NOT NULL DEFAULT '',
        mood_tags TEXT NOT NULL DEFAULT '[]',
        image_url TEXT NOT NULL DEFAULT '',
        recipe_backup TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);
  }

  return database;
}
