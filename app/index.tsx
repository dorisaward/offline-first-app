import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import { Header } from "@/components/header/Header"
import { ListView } from "@/components/list-view/ListView"
import { NetworkBar } from "@/components/network-bar/NetworkBar"
import { Suspense } from "react"
import { SQLiteProvider } from "expo-sqlite"
import { Loading } from "@/components/loading/Loading"
import { DB_NAME, migrateDbIfNeeded } from "@/db/db"

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
        <Suspense fallback={<Loading />}>
          <SQLiteProvider
            databaseName={DB_NAME}
            onInit={migrateDbIfNeeded}
            useSuspense={true}
          >
            <ListView />
            <NetworkBar />
          </SQLiteProvider>
        </Suspense>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
