import { ListView } from "@/components/list-view/ListView"
import { render, screen } from "@testing-library/react-native"
import { Cattle } from "@/utils/Cattle"
import { testCattleData as mockCattleData } from "@/utils/testCattleData"
import { DB_NAME } from "@/db/db"
import { SQLiteProvider } from "expo-sqlite"

jest.mock("@/db/cattle", () => ({
  readAllCattle: jest.fn(() => mockCattleData),
}))

jest.mock("@/components/item-view/ItemView", () => ({
  ItemView: ({ cattle }: { cattle: Cattle }) => {
    const MockText = require("react-native").Text
    return (
      <>
        <MockText>{cattle.id}</MockText>
        <MockText>{cattle.weight}</MockText>
        <MockText>{cattle.age}</MockText>
      </>
    )
  },
}))
const mockCreateItemText = "mock create item"
jest.mock("@/components/item-view/CreateItem", () => ({
  CreateItem: () => {
    const MockText = require("react-native").Text
    return <MockText>{mockCreateItemText}</MockText>
  },
}))

describe("renders ListView", () => {
  it("renders", async () => {
    // Given
    const props = {
      isConnected: true,
      synchronising: true,
      syncCattle: jest.fn(),
    }

    // When
    await render(
      <SQLiteProvider databaseName={DB_NAME}>
        <ListView {...props} />
      </SQLiteProvider>,
    )

    // Then
    mockCattleData.forEach((cattle) => {
      expect(screen.getByText(cattle.id)).toBeTruthy()
      expect(screen.getByText(cattle.weight.toString())).toBeTruthy()
      expect(screen.getByText(cattle.age.toString())).toBeTruthy()
    })
    expect(screen.getByText(mockCreateItemText)).toBeTruthy()
  })
})
