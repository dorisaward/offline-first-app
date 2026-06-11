import { View, Text, StyleSheet } from "react-native"
import { useNetInfo } from "@react-native-community/netinfo"
import { useCallback, useEffect, useState } from "react"
import { syncUnsyncdRecords } from "@/db/sync"
import { useSQLiteContext } from "expo-sqlite"

export const NetworkBar = () => {
  const [synchronising, setSynchronising] = useState<boolean>(false)

  const db = useSQLiteContext()
  const { isConnected } = useNetInfo()

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

  useEffect(() => {
    syncCattle()
  }, [syncCattle])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Network Bar -
        {synchronising
          ? " Synchronising"
          : isConnected
            ? " Connected"
            : " Not Connected"}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    height: 30,
  },
  text: {},
})
