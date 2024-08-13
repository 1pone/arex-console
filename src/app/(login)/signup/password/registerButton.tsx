'use client'

import { Button } from '@/components/button'
import { useFormStatus } from 'react-dom'

export default function RegisterButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Registering' : 'Register Now...'}
    </Button>
  )
}
