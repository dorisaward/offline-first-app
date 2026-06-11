import { useSQLiteContext } from "expo-sqlite"
import { ItemView } from "@/components/item-view/ItemView"
import { Cattle } from "@/utils/Cattle"
import { createACattle } from "@/db/cattle"
import { createSyncForCattle } from "@/db/sync"

export const CreateItem = ({
  shouldRefresh,
}: {
  shouldRefresh: () => void
}) => {
  const db = useSQLiteContext()
  const onChange = (newCattle: Cattle) => {
    createACattle(db, newCattle)
      .then(() => {
        shouldRefresh()
        createSyncForCattle(db, newCattle).then(() => {
          console.log("Syncd")
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }
  return <ItemView onChange={onChange} />
}
