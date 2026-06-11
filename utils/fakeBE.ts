import { Cattle } from "@/utils/Cattle"

export const fakeBE = async (cattleList: Cattle[]) => {
  // Pretend to take some time to save
  await new Promise((resolve) => setTimeout(resolve, 5000))
  const successfulIds = cattleList.map((cattle) => cattle.id)
  const unsuccessfulIds: string[] = [] // cattleList
  // .filter((unSyncd) => !successfulIds.includes(unSyncd.id))
  // .map((cattle) => cattle.id)
  console.log("Saved ids: ", successfulIds)
  console.log("Failed ids: ", unsuccessfulIds)
  return { successfulIds, unsuccessfulIds }
}
