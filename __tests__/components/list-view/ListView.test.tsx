import { ListView } from "@/components/list-view/ListView"
import { render, screen } from "@testing-library/react-native"
import { Cattle } from "@/cattle/Cattle"
import { testCattleData } from "@/cattle/testCattleData"

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

describe("renders ListView", () => {
  it("renders", async () => {
    // Given
    await render(<ListView />)

    // When
    // Then
    testCattleData.forEach((cattle) => {
      expect(screen.getByText(cattle.id)).toBeTruthy()
      expect(screen.getByText(cattle.weight.toString())).toBeTruthy()
      expect(screen.getByText(cattle.age.toString())).toBeTruthy()
    })
    expect(screen.container.toJSON()).toMatchSnapshot()
  })
})
