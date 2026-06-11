import { SQLiteDatabase } from "expo-sqlite"
import { Cattle } from "@/utils/Cattle"
import { Sync } from "@/utils/Sync"
import uuid from "react-native-uuid"
import { SYNC_TABLE_NAME, TABLE_NAME } from "@/db/db"
import { fakeBE } from "@/utils/fakeBE"

export const createSyncForCattle = async (
  db: SQLiteDatabase,
  cattle: Cattle,
) => {
  return db
    .prepareAsync(
      `INSERT INTO ${SYNC_TABLE_NAME} (id, tableName, recordId, timeAddedToSyncQueue) VALUES (?, ?, ?, ?)`,
    )
    .then((statement) =>
      statement.executeAsync<Sync>(
        uuid.v4(),
        TABLE_NAME,
        cattle.id,
        new Date().getMilliseconds(),
      ),
    )
}

export const syncUnsyncdRecords = async (db: SQLiteDatabase) => {
  const unsyncedCattle = await db.getAllAsync<Cattle>(`
      SELECT c.*
      FROM ${TABLE_NAME} c
        INNER JOIN ${SYNC_TABLE_NAME} s ON c.id = s.recordId
      WHERE s.hasSynchronised = 0
  `)
  if (unsyncedCattle.length === 0) {
    console.log("Nothing to sync")
    return
  }
  const { successfulIds, unsuccessfulIds } = await fakeBE(unsyncedCattle)
  const statement = await db.prepareAsync(`
      UPDATE ${SYNC_TABLE_NAME}
      SET hasSynchronised = 1
      WHERE recordId = ? AND hasSynchronised = 0
  `)
  for (const id of successfulIds) {
    await statement.executeAsync<Sync>(id)
  }
  console.log("Synchronised cattle ids: ", successfulIds)
  console.log("Unsynchronised cattle ids: ", unsuccessfulIds)
}
