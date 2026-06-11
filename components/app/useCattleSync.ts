import { useCallback, useState } from "react"
import { syncUnsyncdRecords } from "@/db/sync"
import { useNetInfoInstance } from "@react-native-community/netinfo"
import { useSQLiteContext } from "expo-sqlite"

export const useCattleSync = () => {
  const [synchronising, setSynchronising] = useState<boolean>(false)
  const db = useSQLiteContext()
  const {
    netInfo: { isConnected },
  } = useNetInfoInstance()

  const syncCattle = useCallback(async () => {
    if (isConnected) {
      try {
        setSynchronising(true)
        await syncUnsyncdRecords(db)
      } catch (error) {
        console.error("Error while synchronising", error)
      } finally {
        setSynchronising(false)
      }
    }
  }, [db, isConnected])

  return {
    synchronising,
    isConnected,
    syncCattle,
  }
}
