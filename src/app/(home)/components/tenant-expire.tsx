import Stat from '@/components/stat'
import { TENANT_EXPIRE_KEY } from '@/lib/auth'
import { cookies } from 'next/headers'

export default async function TenantExpire() {
  return (
    <Stat
      title="Free Plan"
      value={`Exp: ${new Date(Number(cookies().get(TENANT_EXPIRE_KEY)?.value)).toLocaleDateString(undefined)}`}
      href="#"
    />
  )
}
