import { renderHook } from "@testing-library/react-native"
import { useCattleSync } from "@/components/app/useCattleSync"
import * as netInfo from "@react-native-community/netinfo"
import { act } from "react"
import { syncUnsyncdRecords } from "@/db/sync"

jest.mock("expo-sqlite", () => ({
  useSQLiteContext: jest.fn(),
}))
jest.mock("@/db/sync", () => ({
  syncUnsyncdRecords: jest.fn(),
}))

const mockNetInfo = jest.spyOn(netInfo, "useNetInfoInstance")

describe("useCattleSync", () => {
  it.each([true, false, null])(
    "should initialise, given isConnected %p",
    async (isConnected) => {
      // Given
      mockNetInfo.mockReturnValue({
        refresh: jest.fn(),
        netInfo: {
          isConnected,
          type: netInfo.NetInfoStateType.unknown,
          isInternetReachable: null,
          details: null,
        },
      })

      // When
      const { result } = await renderHook(useCattleSync)

      // Then
      expect(result.current).toEqual({
        synchronising: false,
        isConnected,
        syncCattle: expect.any(Function),
      })
    },
  )
  it("should call unsyncd records, given sync cattle called", async () => {
    // Given
    mockNetInfo.mockReturnValue({
      refresh: jest.fn(),
      netInfo: {
        isConnected: true,
        type: netInfo.NetInfoStateType.unknown,
        isInternetReachable: null,
        details: null,
      },
    })

    const { result } = await renderHook(() => useCattleSync())

    // When
    await act(async () => {
      await result.current.syncCattle()
    })

    // Then
    expect(syncUnsyncdRecords).toHaveBeenCalled()
  })
})
