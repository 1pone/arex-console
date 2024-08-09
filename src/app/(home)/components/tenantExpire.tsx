'use client'

import { TENANT_EXPIRE_KEY } from '@/lib/auth'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import Stat from './stat'

export default function TenantExpire() {
  const [expireTime, setExpireTime] = useState<string>('-')
  useEffect(() => {
    const tenantExpire = getCookie(TENANT_EXPIRE_KEY)
    setExpireTime(new Date(Number(tenantExpire)).toLocaleDateString())
  }, [])

  return <Stat title="Free Plan" value={`Exp: ${expireTime}`} />
}
