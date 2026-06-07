import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite"
import { Cattle } from "@/cattle/Cattle"

const DB_NAME = "offline-first-app"
const TABLE_NAME = "cattle"

const initDb = async (db?: SQLiteDatabase) => {
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

const readAllCattle = (db: SQLiteDatabase) =>
  db.getAllAsync<Cattle>(`SELECT * FROM ${TABLE_NAME}`)

const createACattle = (db: SQLiteDatabase, cattle: Cattle) =>
  db
    .prepareAsync(
      `INSERT INTO ${TABLE_NAME} (id, weight, age) VALUES (?, ?, ?)`,
    )
    .then((statement) =>
      statement.executeAsync(cattle.id, cattle.weight, cattle.age),
    )

const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  await initDb(db)

  // Test Suspense works
  await new Promise((resolve) => setTimeout(resolve, 2000))
}

export { DB_NAME, TABLE_NAME, createACattle, migrateDbIfNeeded, readAllCattle }
