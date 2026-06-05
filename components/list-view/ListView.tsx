import { FlatList, StyleSheet } from "react-native"
import { testCattleData } from "@/cattle/testCattleData"
import { Cattle } from "@/cattle/Cattle"
import { ItemView } from "@/components/item-view/ItemView"

export const ListView = () => {
  const keyExtractor = (item: Cattle) => item.id
  return (
    <FlatList
      style={styles.container}
      data={testCattleData}
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
