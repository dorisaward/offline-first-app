import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import { Header } from "@/components/header/Header"

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#d5e3fe",
          paddingHorizontal: 8,
        }}
      >
        <Header />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
