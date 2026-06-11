import { DB_NAME, SYNC_TABLE_NAME, TABLE_NAME } from "@/db/db"
import { testCattleData } from "@/utils/testCattleData"
import {
  openDatabaseAsync,
  SQLiteBindParams,
  SQLiteDatabase,
} from "expo-sqlite"
import { Sync } from "@/utils/Sync"

export const addTestDataToDb = async (db: SQLiteDatabase) => {
  const placeholders: string[] = []
  const values: SQLiteBindParams = []
  testCattleData.forEach((data) => {
    placeholders.push("(?, ?, ?)")
    ;[...Object.values(data)].forEach((value) => {
      values.push(value)
    })
  })
  await db.runAsync(
    `INSERT INTO ${TABLE_NAME}(id, weight, age) VALUES ${placeholders}`,
    values,
  )
}

export const initTestDb = async () => await openDatabaseAsync(DB_NAME)

export const initCattleTable = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ${TABLE_NAME}
    (
      id TEXT PRIMARY KEY NOT NULL,
      weight INTEGER NOT NULL,
      age INTEGER NOT NULL
    )
  `)
}
export const initCattleAndSyncTable = async (db: SQLiteDatabase) => {
  await initCattleTable(db)
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ${SYNC_TABLE_NAME}
    (
      id TEXT PRIMARY KEY NOT NULL,
      tableName TEXT NOT NULL,
      recordId TEXT NOT NULL,
      timeAddedToSyncQueue INTEGER NOT NULL,
      retryCount INTEGER DEFAULT 0,
      hasSynchronised INTEGER DEFAULT 0,
      FOREIGN KEY (recordId) REFERENCES ${TABLE_NAME}(id)
    )
  `)
}

export const selectAllSyncTableData = async (db: SQLiteDatabase) =>
  db.getAllAsync<Sync>(`SELECT * FROM ${SYNC_TABLE_NAME}`)
