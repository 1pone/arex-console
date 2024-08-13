import { Button } from '@/components/button'
import { CheckCircleIcon } from '@heroicons/react/16/solid'

export default function Success() {
  return (
    <>
      <CheckCircleIcon className="w-16" />
      Almost done! Please check your mailbox for the activation link email.
      <Button href="/login" className="mt-8">
        Back to Login
      </Button>
    </>
  )
}
