'use client'

import { Text } from '@/components/text'
import { TENANT_TOKEN_KEY } from '@/lib/auth'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'

export default function TenantToken() {
  const [tenantToken, setTenantToken] = useState<string>()
  useEffect(() => {
    setTenantToken(getCookie(TENANT_TOKEN_KEY))
  }, [])

  return <Text className="break-all">{tenantToken}</Text>
}
