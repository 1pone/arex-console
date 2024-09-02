import { Text } from '@/components/text'
import { TENANT_TOKEN_KEY } from '@/lib/auth'
import { cookies } from 'next/headers'

export default function TenantToken() {
  return <Text className="break-all">{cookies().get(TENANT_TOKEN_KEY)?.value}</Text>
}
