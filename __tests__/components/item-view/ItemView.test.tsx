import { ItemView } from "@/components/item-view/ItemView"
import { render, screen } from "@testing-library/react-native"
import { Cattle } from "@/cattle/Cattle"

describe("renders ItemView", () => {
  it("renders", async () => {
    // Given
    const cattle: Cattle = {
      id: "cattle",
      age: 99,
      weight: 999,
    }

    // When
    await render(<ItemView cattle={cattle} />)

    // Then
    expect(screen.getByText(cattle.id)).toBeTruthy()
    expect(screen.getByText(cattle.age.toString())).toBeTruthy()
    expect(screen.getByText(cattle.weight.toString())).toBeTruthy()
    expect(screen.container.toJSON()).toMatchSnapshot()
  })
})
