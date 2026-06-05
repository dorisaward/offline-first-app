import {
  SafeAreaProviderProps,
  SafeAreaViewProps,
} from "react-native-safe-area-context"
import { View } from "react-native"

export const SafeAreaView = (props: SafeAreaViewProps) => (
  <View style={props.style}>{props.children}</View>
)

export const SafeAreaProvider = (props: SafeAreaProviderProps) => (
  <View style={props.style}>{props.children}</View>
)
