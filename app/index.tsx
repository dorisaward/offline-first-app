import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import { Header } from "@/components/header/Header"
import { ListView } from "@/components/list-view/ListView"
import { Suspense } from "react"
import { SQLiteProvider } from "expo-sqlite"
import { Loading } from "@/components/loading/Loading"
import { DB_NAME, migrateDbIfNeeded } from "@/cattle/db"
import { CreateItem } from "@/components/item-view/CreateItem"

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
            <CreateItem />
            <ListView />
          </SQLiteProvider>
        </Suspense>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
