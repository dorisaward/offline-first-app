import { useCattleSync } from "@/components/app/useCattleSync"
import { ListView } from "@/components/list-view/ListView"
import { NetworkBar } from "@/components/network-bar/NetworkBar"

export const App = () => {
  const cattleSync = useCattleSync()
  return (
    <>
      <ListView {...cattleSync} />
      <NetworkBar {...cattleSync} />
    </>
  )
}
