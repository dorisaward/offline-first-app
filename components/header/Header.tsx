import { View, Text, StyleSheet } from "react-native"

export const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tracker App</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 10,
  },
  text: {
    fontSize: 56,
    fontWeight: "700",
    color: "#03296f",
  },
})
