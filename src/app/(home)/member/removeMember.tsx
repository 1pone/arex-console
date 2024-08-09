'use client'

import { removeMember } from '@/app/actions'
import { Button } from '@/components/button'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default async function RemoveMember({ email }: { email: string }) {
  const { refresh } = useRouter()

  const handleRemoveMember = async () => {
    const success = await removeMember(email)
    if (success) {
      refresh()
      toast.success('Remove successfully')
    } else {
      toast.error('Remove failed, please try again')
    }
  }
  return (
    <Button plain onClick={handleRemoveMember}>
      Remove
    </Button>
  )
}
