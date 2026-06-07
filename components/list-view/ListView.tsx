import { FlatList, StyleSheet } from "react-native"
import { useSQLiteContext } from "expo-sqlite"
import { Cattle } from "@/cattle/Cattle"
import { ItemView } from "@/components/item-view/ItemView"
import { useEffect, useState } from "react"
import { readAllCattle } from "@/cattle/db"

export const ListView = () => {
  const db = useSQLiteContext()
  const [allCattle, setAllCattle] = useState<Cattle[]>([])

  useEffect(() => {
    const loadCattle = async () => {
      try {
        const cattleData = await readAllCattle(db)
        setAllCattle([...cattleData])
      } catch (error) {
        console.error("Error loading cattle:", error)
      }
    }

    loadCattle()
  }, [db])

  const keyExtractor = (item: Cattle) => item.id
  return (
    <FlatList
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
