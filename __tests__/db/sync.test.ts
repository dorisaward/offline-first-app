import { SQLiteDatabase } from "expo-sqlite"
import * as testHelpers from "@/utils/testHelpers"
import { testCattleData } from "@/utils/testCattleData"
import { createSyncForCattle, syncUnsyncdRecords } from "@/db/sync"
import { Sync } from "@/utils/Sync"
import { TABLE_NAME } from "@/db/db"

jest.spyOn(console, "log")

let db: SQLiteDatabase

beforeEach(async () => {
  db = await testHelpers.initTestDb()
  await testHelpers.initCattleAndSyncTable(db)
})

describe("createSyncForCattle", () => {
  it("creates sync for Cattle", async () => {
    // Given
    await testHelpers.addTestDataToDb(db)
    const cattle = testCattleData[0]

    // When
    await createSyncForCattle(db, cattle)

    // Then
    const expectedSync: Omit<Sync, "hasSynchronised"> & {
      hasSynchronised: 0 | 1
    } = {
      id: expect.any(String),
      tableName: TABLE_NAME,
      recordId: cattle.id,
      timeAddedToSyncQueue: expect.any(Number),
      retryCount: 0,
      hasSynchronised: 0,
    }
    const results = await testHelpers.selectAllSyncTableData(db)
    expect(results).toEqual([expectedSync])
  })
  it("does not create sync for Cattle, given cattle not in Cattle table", async () => {
    // Given
    const cattle = testCattleData[0]

    // When
    try {
      await createSyncForCattle(db, cattle)
      fail("did not throw expected error")

      // Then
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
      if ((e as Error)["message"]) {
        expect((e as Error).message).toEqual("FOREIGN KEY constraint failed")
      } else {
        fail("error does not have key message")
      }
    }
  })
})

describe("syncUnsyncdRecords", () => {
  it("does not sync, given nothing to sync", async () => {
    // Given

    // When
    await syncUnsyncdRecords(db)

    // Then
    expect(console.log).toHaveBeenCalledWith("Nothing to sync")
  })
})
