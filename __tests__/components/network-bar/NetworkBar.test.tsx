import { NetworkBar } from "@/components/network-bar/NetworkBar"
import { render, screen, waitFor } from "@testing-library/react-native"
import { DB_NAME } from "@/db/db"
import { SQLiteProvider } from "expo-sqlite"

describe("renders NetworkBar", () => {
  it.each([null, false])(
    "renders Not Connected, given isConnected %p",
    async (isConnected) => {
      // Given
      const props = {
        isConnected,
        synchronising: false,
        syncCattle: jest.fn(),
      }

      // When
      await render(
        <SQLiteProvider databaseName={DB_NAME}>
          <NetworkBar {...props} />
        </SQLiteProvider>,
      )

      // Then
      expect(screen.getByText("Network Bar - Not Connected")).toBeTruthy()
    },
  )
  it("renders Connected, given connected", async () => {
    // Given
    const props = {
      isConnected: true,
      synchronising: false,
      syncCattle: jest.fn(),
    }

    // When
    await render(
      <SQLiteProvider databaseName={DB_NAME}>
        <NetworkBar {...props} />
      </SQLiteProvider>,
    )

    // Then
    expect(screen.getByText("Network Bar - Connected")).toBeTruthy()
  })
  it("renders Synchronising, given synchronising", async () => {
    // Given
    const props = {
      isConnected: true,
      synchronising: true,
      syncCattle: jest.fn(),
    }

    // When
    await render(
      <SQLiteProvider databaseName={DB_NAME}>
        <NetworkBar {...props} />
      </SQLiteProvider>,
    )

    // Then
    await waitFor(async () =>
      expect(screen.queryByText("Network Bar - Connected")).toBeFalsy(),
    )
    expect(screen.getByText("Network Bar - Synchronising")).toBeTruthy()
  })
})
