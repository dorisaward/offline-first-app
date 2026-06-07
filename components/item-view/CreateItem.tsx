import { useSQLiteContext } from "expo-sqlite"
import { ItemView } from "@/components/item-view/ItemView"
import { Cattle } from "@/cattle/Cattle"
import { createACattle } from "@/cattle/db"

export const CreateItem = () => {
  const db = useSQLiteContext()
  const onChange = (newCattle: Cattle) => {
    createACattle(db, newCattle).catch((e) => {
      console.error(e)
    })
  }
  return <ItemView onChange={onChange} />
}
