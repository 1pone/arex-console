import Stat from '@/components/stat'
import { formatBytes } from '@/lib/utils'
import { querySubscribeUsage } from '../actions'

export default async function SubscribeInfo() {
  const subscribeData = await querySubscribeUsage()

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
