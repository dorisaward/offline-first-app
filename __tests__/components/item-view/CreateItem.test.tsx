import { CreateItem } from "@/components/item-view/CreateItem"
import { render, screen } from "@testing-library/react-native"
import { Cattle } from "@/utils/Cattle"
import { SQLiteProvider } from "expo-sqlite"
import { DB_NAME } from "@/db/db"

const mockItemViewText = "mock-item-view-text"
jest.mock("@/components/item-view/ItemView", () => ({
  ItemView: (props: { onChange: (cattle: Cattle) => void }) => {
    const MockText = require("react-native").Text
    return <MockText {...props}>{mockItemViewText}</MockText>
  },
}))

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
})
