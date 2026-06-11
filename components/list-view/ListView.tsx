import { FlatList, StyleSheet } from "react-native"
import { useSQLiteContext } from "expo-sqlite"
import { Cattle } from "@/utils/Cattle"
import { ItemView } from "@/components/item-view/ItemView"
import { useCallback, useEffect, useState } from "react"
import { readAllCattle } from "@/db/cattle"
import { CreateItem } from "@/components/item-view/CreateItem"
import { useCattleSync } from "@/components/app/useCattleSync"

export const ListView = ({ syncCattle }: ReturnType<typeof useCattleSync>) => {
  const db = useSQLiteContext()
  const [allCattle, setAllCattle] = useState<Cattle[]>([])
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(false)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const loadCattle = useCallback(async () => {
    setRefreshing(true)
    try {
      const cattleData = await readAllCattle(db)
      setAllCattle([...cattleData])
    } catch (error) {
      console.error("Error loading utils:", error)
    } finally {
      setRefreshing(false)
    }
  }, [db])

  useEffect(() => {
    loadCattle()
  }, [loadCattle, shouldRefresh])

  useEffect(() => {
    if (!refreshing) {
      syncCattle()
    }
  }, [syncCattle, refreshing])

  const keyExtractor = (item: Cattle) => item.id
  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={loadCattle}
      ListHeaderComponent={() => (
        <CreateItem shouldRefresh={() => setShouldRefresh((prev) => !prev)} />
      )}
      style={styles.container}
      data={allCattle}
      keyExtractor={keyExtractor}
      renderItem={(props) => <ItemView cattle={props.item} />}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    height: "30%",
  },
})
