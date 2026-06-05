import App from "@/app/index"
import { render, screen } from "@testing-library/react-native"

const mockHeaderText = "mock header"
jest.mock("@/components/header/Header", () => {
  const MockText = require("react-native").Text
  return {
    Header: () => <MockText>{mockHeaderText}</MockText>,
  }
})

describe("renders root of project", () => {
  it("renders", async () => {
    // Given
    await render(<App />)

    // When
    // Then
    expect(screen.getByText(mockHeaderText)).toBeTruthy()
  })
})
