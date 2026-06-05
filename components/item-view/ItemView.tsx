import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { Cattle } from "@/cattle/Cattle"

export const ItemView = ({ cattle }: { cattle: Cattle }) => {
  // TODO: Tap to edit/delete
  const onPress = () => console.log("onPress", cattle.id)
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.label}>ID</Text>
        <View>
          <Text style={styles.value}>{cattle.id}</Text>
        </View>
      </View>

      <View style={styles.column}>
        <Text style={styles.label}>Weight</Text>
        <View>
          <Text style={styles.value}>{cattle.weight}</Text>
          <Text style={styles.unit}>kg</Text>
        </View>
      </View>

      <View style={styles.column}>
        <Text style={styles.label}>Age</Text>
        <View>
          <Text style={styles.value}>{cattle.age}</Text>
          <Text style={styles.unit}>months</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#03296f",
  },

  column: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },

  label: {
    color: "#6B7280",
  },

  value: {
    fontSize: 28,
    color: "#111827",
  },

  unit: {
    color: "#9CA3AF",
  },
})
