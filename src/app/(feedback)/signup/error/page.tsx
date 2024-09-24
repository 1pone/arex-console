import LogoutButton from '@/components/logout-button'
import { Text } from '@/components/text'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

export default function Error() {
  return (
    <>
      <ExclamationCircleIcon />
      <Text>Oops, Sign up failed, please try again...</Text>

      <LogoutButton />
    </>
  )
}
