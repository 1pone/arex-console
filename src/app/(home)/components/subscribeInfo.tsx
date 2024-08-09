import { querySubscribeUsage } from '@/app/actions'
import Stat from './stat'

export default async function SubscribeInfo() {
  const subscribeData = await querySubscribeUsage()

  return (
    <>
      <Stat title="Traffic" value={`${subscribeData?.trafficUsageBytes} / ${subscribeData?.trafficLimitBytes}`} />
      <Stat title="Member" value={`${subscribeData?.memberUsage} / ${subscribeData?.memberLimit}`} />
    </>
  )
}
