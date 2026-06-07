import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { useState } from "react"
import { Cattle } from "@/utils/Cattle"

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
    const parsedAge = parseInt(age)
    const parsedWeight = parseInt(weight)
    if (Number.isNaN(parsedAge)) {
      console.error(`${age} should be a whole number`)
      return
    }
    if (Number.isNaN(parsedWeight)) {
      console.error(`${weight} should be a whole number`)
      return
    }
    try {
      onChange({ id, age: parsedAge, weight: parsedWeight })
    } catch (error) {
      // TODO: better error UX
      console.error(error)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.label}>ID</Text>
        <View>
          {cattle ? (
            <Text style={styles.value}>{cattle.id}</Text>
          ) : (
            <TextInput
              testID={"id-input"}
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
              testID={"weight-input"}
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
              testID={"age-input"}
              keyboardType={"number-pad"}
              style={styles.input}
              onChangeText={setAge}
            />
          )}
          <Text style={styles.unit}>months</Text>
        </View>
      </View>

      <View style={styles.column}>
        <View style={styles.actions}>
          {onChange && (
            <TouchableOpacity
              accessibilityRole={"button"}
              style={styles.actionButton}
              onPress={onPress}
            >
              <Text style={styles.actionButtonText}>Submit</Text>
            </TouchableOpacity>
          )}
          {cattle && (
            <>
              <TouchableOpacity
                accessibilityRole={"button"}
                style={styles.actionButton}
                onPress={() => {}}
              >
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessibilityRole={"button"}
                style={styles.actionButton}
                onPress={() => {}}
              >
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
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

  actions: {
    gap: 8,
  },

  actionButton: {
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    padding: 8,
  },

  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
})
