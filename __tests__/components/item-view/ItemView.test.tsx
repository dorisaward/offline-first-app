import { ItemView } from "@/components/item-view/ItemView"
import { render, screen, userEvent } from "@testing-library/react-native"
import { Cattle } from "@/utils/Cattle"

jest.spyOn(console, "error")

describe("renders ItemView", () => {
  it("renders view", async () => {
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

  it("renders create", async () => {
    // Given
    const onChange = jest.fn()

    // When
    await render(<ItemView onChange={onChange} />)

    // Then
    expect(screen.getByText("ID")).toBeTruthy()
    expect(screen.getByText("Age")).toBeTruthy()
    expect(screen.getByText("Weight")).toBeTruthy()
    expect(screen.container.toJSON()).toMatchSnapshot()
  })
})

describe("creates new item", () => {
  it("submits new item, given data", async () => {
    // Given
    const testCattle: Cattle = {
      id: "test",
      age: 0,
      weight: 0,
    }
    const onChange = jest.fn()
    await render(<ItemView onChange={onChange} />)

    const idInput = screen.getByTestId("id-input")
    await userEvent.type(idInput, testCattle.id)

    const ageInput = screen.getByTestId("age-input")
    await userEvent.type(ageInput, testCattle.age.toString())

    const weightInput = screen.getByTestId("weight-input")
    await userEvent.type(weightInput, testCattle.weight.toString())

    const submitButton = screen.getByRole("button")

    // When
    await userEvent.press(submitButton)

    // Then
    expect(onChange).toHaveBeenCalledWith(testCattle)
  })

  it.each(["id", "age", "weight"])(
    "does not submit item, given missing %p",
    async (key) => {
      // Given
      const testCattle: Cattle = {
        id: "test",
        age: 0,
        weight: 0,
      }
      const onChange = jest.fn()
      await render(<ItemView onChange={onChange} />)

      if (key !== "id") {
        const idInput = screen.getByTestId("id-input")
        await userEvent.type(idInput, testCattle.id)
      }

      if (key !== "age") {
        const ageInput = screen.getByTestId("age-input")
        await userEvent.type(ageInput, testCattle.age.toString())
      }

      if (key !== "weight") {
        const weightInput = screen.getByTestId("weight-input")
        await userEvent.type(weightInput, testCattle.weight.toString())
      }

      const submitButton = screen.getByRole("button")

      // When
      await userEvent.press(submitButton)

      // Then
      expect(onChange).not.toHaveBeenCalled()
    },
  )

  it.each(["age", "weight"])(
    "does not submit item, given %p not a number",
    async (key) => {
      // Given
      const testCattle: Record<string, string> = {
        id: "test",
        age: "0",
        weight: "0",
      }
      const onChange = jest.fn()

      testCattle[key] = "not-a-number"

      await render(<ItemView onChange={onChange} />)
      const idInput = screen.getByTestId("id-input")
      await userEvent.type(idInput, testCattle.id)

      const ageInput = screen.getByTestId("age-input")
      await userEvent.type(ageInput, testCattle.age)

      const weightInput = screen.getByTestId("weight-input")
      await userEvent.type(weightInput, testCattle.weight)

      const submitButton = screen.getByRole("button")

      // When
      await userEvent.press(submitButton)

      // Then
      expect(onChange).not.toHaveBeenCalled()
      expect(console.error).toHaveBeenCalledWith(
        testCattle[key] + " should be a whole number",
      )
    },
  )

  it("does not submit item, given some other error", async () => {
    // Given
    const testCattle: Cattle = {
      id: "test",
      age: 0,
      weight: 0,
    }
    const error = new Error()
    const onChange = jest.fn().mockImplementation(() => {
      throw error
    })
    await render(<ItemView onChange={onChange} />)

    const idInput = screen.getByTestId("id-input")
    await userEvent.type(idInput, testCattle.id)

    const ageInput = screen.getByTestId("age-input")
    await userEvent.type(ageInput, testCattle.age.toString())

    const weightInput = screen.getByTestId("weight-input")
    await userEvent.type(weightInput, testCattle.weight.toString())

    const submitButton = screen.getByRole("button")

    // When
    await userEvent.press(submitButton)

    // Then
    expect(onChange).toHaveBeenCalledWith(testCattle)
    expect(console.error).toHaveBeenCalledWith(error)
  })
})
