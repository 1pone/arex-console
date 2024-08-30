'use client'

import { Button } from '@/components/button'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Profile() {
  const user = useUser()
  return (
    <div>
      {JSON.stringify(user)}
      <Button href="/api/auth/login">login</Button>
      <Button href="/api/auth/logout">logout</Button>
    </div>
  )
}
