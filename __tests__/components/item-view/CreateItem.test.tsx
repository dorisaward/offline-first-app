import { CreateItem } from "@/components/item-view/CreateItem"
import { render, screen, userEvent } from "@testing-library/react-native"
import { Cattle } from "@/utils/Cattle"
import { SQLiteProvider } from "expo-sqlite"
import { DB_NAME } from "@/db/db"
import * as sync from "@/db/sync"
import * as cattle from "@/db/cattle"

const mockItemViewText = "mock-item-view-text"
jest.mock("@/components/item-view/ItemView", () => ({
  ItemView: (props: { onChange: (cattle: Cattle) => void }) => {
    const MockText = require("react-native").Text
    const MockTouchable = require("react-native").TouchableOpacity
    return (
      <MockTouchable onPress={props.onChange}>
        <MockText {...props}>{mockItemViewText}</MockText>
      </MockTouchable>
    )
  },
}))
const mockCreateSync = jest.spyOn(sync, "createSyncForCattle")
const mockCreateCattle = jest.spyOn(cattle, "createACattle")

describe("renders CreateItem", () => {
  it("renders ItemView", async () => {
    // Given
    const shouldRefresh = jest.fn()

    // When
    await render(
      <SQLiteProvider databaseName={DB_NAME}>
        <CreateItem shouldRefresh={shouldRefresh} />
      </SQLiteProvider>,
    )

    // Then
    expect(screen.getByText(mockItemViewText)).toBeTruthy()
  })
  it("creates sync", async () => {
    // Given
    mockCreateCattle.mockResolvedValue({} as any)
    mockCreateSync.mockResolvedValue({} as any)
    const shouldRefresh = jest.fn()

    await render(
      <SQLiteProvider databaseName={DB_NAME}>
        <CreateItem shouldRefresh={shouldRefresh} />
      </SQLiteProvider>,
    )

    // When
    await userEvent.press(screen.getByText(mockItemViewText))

    // Then
    expect(mockCreateCattle).toHaveBeenCalled()
    expect(shouldRefresh).toHaveBeenCalled()
    expect(mockCreateSync).toHaveBeenCalled()
  })
})
