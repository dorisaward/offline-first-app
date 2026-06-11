import { App } from "@/components/app/App"
import { render, screen } from "@testing-library/react-native"
import * as CattleSync from "@/components/app/useCattleSync"

const mockNetworkBarText = "mock network bar"
jest.mock("@/components/network-bar/NetworkBar", () => {
  const MockText = require("react-native").Text
  return {
    NetworkBar: () => <MockText>{mockNetworkBarText}</MockText>,
  }
})
const mockListText = "mock list"
jest.mock("@/components/list-view/ListView", () => {
  const MockText = require("react-native").Text
  return {
    ListView: () => <MockText>{mockListText}</MockText>,
  }
})

const mockCattleSync = jest.spyOn(CattleSync, "useCattleSync")

describe("renders app", () => {
  it("renders create item and list view", async () => {
    // Given
    mockCattleSync.mockReturnValue({
      isConnected: true,
      synchronising: true,
      syncCattle: jest.fn(),
    })

    // When
    await render(<App />)

    // Then
    expect(screen.getByText(mockListText)).toBeTruthy()
    expect(screen.getByText(mockNetworkBarText)).toBeTruthy()
  })
})
