import { DB_NAME, migrateDbIfNeeded } from "@/db/db"
import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite"

// Having trouble spying on expo-sqlite while using expo-sqlite-mock
describe.skip("migrateDbIfNeeded", () => {
  it("creates db", async () => {
    // Given

    // When
    await migrateDbIfNeeded()

    // Then
    expect(openDatabaseAsync).toHaveBeenCalledWith(DB_NAME)
  })
})
