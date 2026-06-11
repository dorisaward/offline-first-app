import App from "@/app/index"
import { render, screen, waitFor } from "@testing-library/react-native"

const mockNetworkBarText = "mock network bar"
jest.mock("@/components/network-bar/NetworkBar", () => {
  const MockText = require("react-native").Text
  return {
    NetworkBar: () => <MockText>{mockNetworkBarText}</MockText>,
  }
})
const mockHeaderText = "mock header"
jest.mock("@/components/header/Header", () => {
  const MockText = require("react-native").Text
  return {
    Header: () => <MockText>{mockHeaderText}</MockText>,
  }
})
const mockListText = "mock list"
jest.mock("@/components/list-view/ListView", () => {
  const MockText = require("react-native").Text
  return {
    ListView: () => <MockText>{mockListText}</MockText>,
  }
})
const mockLoadingText = "mock loading"
jest.mock("@/components/loading/Loading", () => {
  const MockText = require("react-native").Text
  return {
    Loading: () => <MockText>{mockLoadingText}</MockText>,
  }
})

describe("renders root of project", () => {
  it("renders loading", async () => {
    // Given
    await render(<App />)

    // When

    // Then
    expect(screen.getByText(mockHeaderText)).toBeTruthy()
    expect(screen.getByText(mockLoadingText)).toBeTruthy()
  })
  it("renders create item and list view", async () => {
    // Given
    await render(<App />)

    // When
    await waitFor(
      async () => expect(screen.queryByText(mockLoadingText)).toBeFalsy(),
      { timeout: 3000 },
    )

    // Then
    expect(screen.getByText(mockHeaderText)).toBeTruthy()
    expect(screen.getByText(mockListText)).toBeTruthy()
    expect(screen.getByText(mockNetworkBarText)).toBeTruthy()
  })
})
