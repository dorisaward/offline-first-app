import { Header } from "@/components/header/Header"
import { render, screen } from "@testing-library/react-native"

describe("renders the header", () => {
  it("renders", async () => {
    // Given

    // When
    await render(<Header />)

    // Then
    expect(screen.getByText("Tracker App")).toBeTruthy()
    expect(screen.container.toJSON()).toMatchSnapshot()
  })
})
