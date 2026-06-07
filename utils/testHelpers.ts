import { DB_NAME } from "@/db/db"
import { testCattleData } from "@/utils/testCattleData"
import {
  openDatabaseAsync,
  SQLiteBindParams,
  SQLiteDatabase,
} from "expo-sqlite"
import { TABLE_NAME } from "@/db/cattle"

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
