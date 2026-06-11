import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite"

export const DB_NAME = "offline-first-app"
export const TABLE_NAME = "cattle"
export const SYNC_TABLE_NAME = "sync"

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
    );
    CREATE TABLE IF NOT EXISTS ${SYNC_TABLE_NAME}
    (
      id TEXT PRIMARY KEY NOT NULL,
      tableName TEXT NOT NULL,
      recordId TEXT NOT NULL,
      timeAddedToSyncQueue INTEGER NOT NULL,
      retryCount INTEGER DEFAULT 0,
      hasSynchronised INTEGER DEFAULT 0,
      FOREIGN KEY (recordId) REFERENCES ${TABLE_NAME}(id)
    );
  `)
}

export const migrateDbIfNeeded = async (db?: SQLiteDatabase) => {
  await initDb(db)

  // Test Suspense works
  await new Promise((resolve) => setTimeout(resolve, 2000))
}
