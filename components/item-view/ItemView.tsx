import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { useState } from "react"
import { Cattle } from "@/cattle/Cattle"

interface ViewProps {
  cattle: Cattle
}

interface CreateEditProps {
  onChange: (cattle: Cattle) => void
}

export const ItemView = (props: ViewProps | CreateEditProps) => {
  const [id, setId] = useState<string | undefined>(undefined)
  const [age, setAge] = useState<string | undefined>(undefined)
  const [weight, setWeight] = useState<string | undefined>(undefined)
  const cattle = "cattle" in props ? props.cattle : undefined
  const onChange = "onChange" in props ? props.onChange : undefined

  const onPress = () => {
    if (!onChange || !id || !age || !weight) {
      return
    }
    try {
      onChange({ id, age: Number(age), weight: Number(weight) })
    } catch (error) {
      // TODO: better error UX
      console.error(error)
    }
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.label}>ID</Text>
        <View>
          {cattle ? (
            <Text style={styles.value}>{cattle.id}</Text>
          ) : (
            <TextInput
              keyboardType={"default"}
              style={styles.input}
              onChangeText={setId}
            />
          )}
        </View>
      </View>

      <View style={styles.column}>
        <Text style={styles.label}>Weight</Text>
        <View>
          {cattle ? (
            <Text style={styles.value}>{cattle.weight}</Text>
          ) : (
            <TextInput
              keyboardType={"number-pad"}
              style={styles.input}
              onChangeText={setWeight}
            />
          )}
          <Text style={styles.unit}>kg</Text>
        </View>
      </View>

      <View style={styles.column}>
        <Text style={styles.label}>Age</Text>
        <View>
          {cattle ? (
            <Text style={styles.value}>{cattle.age}</Text>
          ) : (
            <TextInput
              keyboardType={"number-pad"}
              style={styles.input}
              onChangeText={setAge}
            />
          )}
          <Text style={styles.unit}>months</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  input: {
    minWidth: "80%",
    borderWidth: 1,
    borderColor: "#03296f",
    borderRadius: 5,
    fontSize: 28,
    color: "#111827",
  },

  unit: {
    color: "#9CA3AF",
    alignSelf: "center",
  },
})
