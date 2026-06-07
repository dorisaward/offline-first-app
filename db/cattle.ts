import { SQLiteDatabase } from "expo-sqlite"
import { Cattle } from "@/utils/Cattle"

export const TABLE_NAME = "cattle"

export const readAllCattle = (db: SQLiteDatabase) =>
  db.getAllAsync<Cattle>(`SELECT * FROM ${TABLE_NAME}`)

export const createACattle = (db: SQLiteDatabase, cattle: Cattle) =>
  db
    .prepareAsync(
      `INSERT INTO ${TABLE_NAME} (id, weight, age) VALUES (?, ?, ?)`,
    )
    .then((statement) =>
      statement.executeAsync(cattle.id, cattle.weight, cattle.age),
    )
