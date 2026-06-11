import { NetworkBar } from "@/components/network-bar/NetworkBar"
import * as NetInfo from "@react-native-community/netinfo"
import { render, screen } from "@testing-library/react-native"
import { DB_NAME } from "@/db/db"
import { SQLiteProvider } from "expo-sqlite"

const mockNetInfo = jest.spyOn(NetInfo, "useNetInfoInstance")

jest.mock("@/db/sync", () => ({
  syncUnsyncdRecords: jest.fn(),
}))

describe("renders NetworkBar", () => {
  it.each([null, false])(
    "renders Not Connected, given isConnected %p",
    async (isConnected) => {
      // Given
      mockNetInfo.mockImplementation(() => ({
        netInfo: {
          type: NetInfo.NetInfoStateType.unknown,
          isConnected,
          isInternetReachable: null,
          details: null,
        },
        refresh: jest.fn(),
      }))

      // When
      await render(
        <SQLiteProvider databaseName={DB_NAME}>
          <NetworkBar />
        </SQLiteProvider>,
      )

      // Then
      expect(screen.getByText("Network Bar - Not Connected")).toBeTruthy()
    },
  )
  it("renders Connected, given connected", async () => {
    // Given
    mockNetInfo.mockImplementation(() => ({
      netInfo: {
        type: NetInfo.NetInfoStateType.unknown,
        isConnected: true,
        isInternetReachable: null,
        details: null,
      },
      refresh: jest.fn(),
    }))

    // When
    await render(
      <SQLiteProvider databaseName={DB_NAME}>
        <NetworkBar />
      </SQLiteProvider>,
    )

    // Then
    expect(screen.getByText("Network Bar - Connected")).toBeTruthy()
  })
  it("renders Synchronising, given synchronising", async () => {
    // Given
    mockNetInfo.mockImplementation(() => ({
      netInfo: {
        type: NetInfo.NetInfoStateType.unknown,
        isConnected: true,
        isInternetReachable: null,
        details: null,
      },
      refresh: jest.fn(),
    }))

    // When
    await render(
      <SQLiteProvider databaseName={DB_NAME}>
        <NetworkBar />
      </SQLiteProvider>,
    )

    // Then
    expect(screen.getByText("Network Bar - Synchronising")).toBeTruthy()
  })
})
