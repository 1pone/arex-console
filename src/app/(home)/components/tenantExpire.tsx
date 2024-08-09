'use client'

import Stat from '@/components/stat'
import { TENANT_EXPIRE_KEY } from '@/lib/auth'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'

export default function TenantExpire() {
  const [expireTime, setExpireTime] = useState<string>('-')
  useEffect(() => {
    const tenantExpire = getCookie(TENANT_EXPIRE_KEY)
    setExpireTime(new Date(Number(tenantExpire)).toLocaleDateString())
  }, [])

  return <Stat title="Free Plan" value={`Exp: ${expireTime}`} href="/orders" />
}
