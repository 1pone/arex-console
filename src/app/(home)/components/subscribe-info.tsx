import Stat from '@/components/stat'
import { formatBytes } from '@/lib/utils'
import { toast } from 'react-toastify'
import { querySubscribeUsage, SubscribeUsage } from '../actions'

export default async function SubscribeInfo() {
  let subscribeData: SubscribeUsage | undefined
  try {
    subscribeData = await querySubscribeUsage()
  } catch (e) {
    if (e instanceof Error) toast.error(e.message)
  }

  return (
    <>
      <Stat
        title="Traffic"
        value={`${formatBytes(subscribeData?.trafficUsageBytes)} / ${formatBytes(subscribeData?.trafficLimitBytes)}`}
        // change="+12%"
      />

      <Stat href="/member" title="Member" value={`${subscribeData?.memberUsage} / ${subscribeData?.memberLimit}`} />
    </>
  )
}
