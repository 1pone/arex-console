import { Button } from '@/components/button'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

export default function Error() {
  return (
    <>
      <ExclamationCircleIcon />
      Oops, Sign up failed, please try again...
      <Button href="/signup" className="mt-8">
        Back to Signup
      </Button>
    </>
  )
}
