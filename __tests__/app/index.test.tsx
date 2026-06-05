import App from "../../app/index"
import { render, screen } from "@testing-library/react-native"

describe("renders", () => {
  it("renders", async () => {
    // Given
    await render(<App />)

    // When
    // Then
    expect(
      screen.getByText("Edit app/index.tsx to edit this screen."),
    ).toBeTruthy()
  })
})
