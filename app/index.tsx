import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import { Header } from "@/components/header/Header"
import { ListView } from "@/components/list-view/ListView"
import { ItemView } from "@/components/item-view/ItemView"
import { useState } from "react"
import { Cattle } from "@/cattle/Cattle"

export default function Index() {
  const [cattle, setCattle] = useState<Cattle | undefined>(undefined)
  console.log(cattle)
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
        <ItemView onChange={setCattle} />
        <ListView />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
