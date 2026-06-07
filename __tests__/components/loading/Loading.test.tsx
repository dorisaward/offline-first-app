import { render, screen } from "@testing-library/react-native"
import { Loading } from "@/components/loading/Loading"

describe("renders loading", () => {
  it("renders loading", async () => {
    // Given

    // When
    await render(<Loading />)

    // Then
    expect(screen.container.toJSON()).toMatchSnapshot()
  })
})
