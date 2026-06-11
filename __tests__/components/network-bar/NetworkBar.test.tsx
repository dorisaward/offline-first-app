import { NetworkBar } from "@/components/network-bar/NetworkBar"
import * as NetInfo from "@react-native-community/netinfo"
import { render, screen, waitFor } from "@testing-library/react-native"
import { DB_NAME } from "@/db/db"
import { SQLiteProvider } from "expo-sqlite"
import * as sync from "@/db/sync"

const mockNetInfo = jest.spyOn(NetInfo, "useNetInfo")
const mockSyncUnsyncdRecords = jest.spyOn(sync, "syncUnsyncdRecords")

describe("renders NetworkBar", () => {
  it.each([null, false])(
    "renders Not Connected, given isConnected %p",
    async (isConnected) => {
      // Given
      mockNetInfo.mockImplementation(() => ({
        type: NetInfo.NetInfoStateType.unknown,
        isConnected,
        isInternetReachable: null,
        details: null,
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
      type: NetInfo.NetInfoStateType.unknown,
      isConnected: true,
      isInternetReachable: null,
      details: null,
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
    mockSyncUnsyncdRecords.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    )
    mockNetInfo.mockImplementation(() => ({
      type: NetInfo.NetInfoStateType.unknown,
      isConnected: true,
      isInternetReachable: null,
      details: null,
    }))

    // When
    await render(
      <SQLiteProvider databaseName={DB_NAME}>
        <NetworkBar />
      </SQLiteProvider>,
    )

    // Then
    await waitFor(async () =>
      expect(screen.queryByText("Network Bar - Connected")).toBeFalsy(),
    )
    expect(screen.getByText("Network Bar - Synchronising")).toBeTruthy()
  })
})
