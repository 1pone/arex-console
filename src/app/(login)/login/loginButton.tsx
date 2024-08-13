'use client'

import { Button } from '@/components/button'
import { useFormStatus } from 'react-dom'

export default function LoginButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Signing in...' : 'Sign in'}
    </Button>
  )
}
