import { View, Text, StyleSheet } from "react-native"
import { useCattleSync } from "@/components/app/useCattleSync"

export const NetworkBar = ({
  synchronising,
  isConnected,
}: ReturnType<typeof useCattleSync>) => {
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
