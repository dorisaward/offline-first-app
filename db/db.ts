import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite"
import { TABLE_NAME } from "@/db/cattle"

export const DB_NAME = "offline-first-app"

export const initDb = async (db?: SQLiteDatabase) => {
  if (!db) {
    db = await openDatabaseAsync(DB_NAME)
  }
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ${TABLE_NAME}
    (
      id TEXT PRIMARY KEY NOT NULL,
      weight INTEGER NOT NULL,
      age INTEGER NOT NULL
    )
  `)
}

export const migrateDbIfNeeded = async (db?: SQLiteDatabase) => {
  await initDb(db)

  // Test Suspense works
  await new Promise((resolve) => setTimeout(resolve, 2000))
}
