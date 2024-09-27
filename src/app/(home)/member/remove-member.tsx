'use client'

import { Button } from '@/components/button'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { removeMember } from '../actions'

export default function RemoveMember({ email }: { email: string }) {
  const { refresh } = useRouter()

  const handleRemoveMember = async () => {
    try {
      await removeMember(email)
      refresh()
      toast.success('Remove successfully')
    } catch (e) {
      toast.error('Remove failed, please try again')
    }
  }

  return (
    <Button plain onClick={handleRemoveMember}>
      Remove
    </Button>
  )
}
