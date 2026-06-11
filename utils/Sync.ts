import { TABLE_NAME } from "@/db/db"

export interface Sync {
  /**
   * uuid
   */
  id: string

  /**
   * the table of the record to sync - but there's currently only one
   */
  tableName: typeof TABLE_NAME

  /**
   * the id of the record to sync
   */
  recordId: string

  /**
   * milliseconds timeAddedToSyncQueue in UTC
   */
  timeAddedToSyncQueue: ReturnType<Date["getUTCMilliseconds"]>

  /**
   * how many times has this tried to sync
   */
  retryCount: number

  /**
   * whether the record has synchronised or not
   */
  hasSynchronised: boolean
}
