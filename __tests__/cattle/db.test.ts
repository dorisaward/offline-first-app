import {
  DB_NAME,
  createACattle,
  migrateDbIfNeeded,
  readAllCattle,
} from "@/cattle/db"
import { testCattleData } from "@/cattle/testCattleData"
import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite"
import * as testHelpers from "@/cattle/testHelpers"

let db: SQLiteDatabase

beforeEach(async () => {
  db = await testHelpers.initTestDb()
})

// Having trouble spying on expo-sqlite while using expo-sqlite-mock
describe.skip("migrateDbIfNeeded", () => {
  it("creates db", async () => {
    // Given

    // When
    await migrateDbIfNeeded(db)

    // Then
    expect(openDatabaseAsync).toHaveBeenCalledWith(DB_NAME)
  })
})

describe("createACattle", () => {
  it("creates a cattle, given a cattle", async () => {
    // Given
    await testHelpers.initCattleTable(db)
    const cattle = testCattleData[0]

    // When
    await createACattle(db, cattle)

    // Then
    const allCattle = await readAllCattle(db)
    expect(allCattle).toHaveLength(1)
    expect(allCattle[0]).toEqual(cattle)
  })

  it("does not create a cattle, given not a cattle", async () => {
    // Given
    await testHelpers.initCattleTable(db)
    const notCattle = {
      id: undefined,
      age: undefined,
      weight: undefined,
    }

    // When
    try {
      // @ts-expect-error this is wrong on purpose for the test
      await createACattle(db, notCattle)
      fail("did not throw expected error")

      // Then
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
      if ((e as Error)["message"]) {
        expect((e as Error).message).toEqual(
          "NOT NULL constraint failed: cattle.id",
        )
      } else {
        fail("error does not have key message")
      }
    }
  })

  it("throws, give table does not exist", async () => {
    // Given
    const cattle = testCattleData[0]

    // When
    try {
      await createACattle(db, cattle)
      fail("did not throw expected error")

      // Then
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
      if ((e as Error)["message"]) {
        expect((e as Error).message).toEqual("no such table: cattle")
      } else {
        fail("error does not have key message")
      }
    }
  })
})

describe("readAllCattle", () => {
  it("reads all cattle, given cattle", async () => {
    // Given
    await testHelpers.initCattleTable(db)
    await testHelpers.addTestDataToDb(db)

    // When
    const result = await readAllCattle(db)

    // Then
    expect(result).toEqual(testCattleData)
  })

  it("reads all cattle, given no cattle", async () => {
    // Given
    await testHelpers.initCattleTable(db)

    // When
    const result = await readAllCattle(db)

    // Then
    expect(result).toHaveLength(0)
  })

  it("throws, given no table", async () => {
    // Given

    // When
    try {
      await readAllCattle(db)
      fail("did not throw expected error")

      // Then
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
      if ((e as Error)["message"]) {
        expect((e as Error).message).toEqual("no such table: cattle")
      } else {
        fail("error does not have key message")
      }
    }
  })
})
