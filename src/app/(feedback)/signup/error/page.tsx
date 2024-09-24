import LoginButton from '@/components/login-button'
import { Text } from '@/components/text'
import { ExclamationCircleIcon } from '@heroicons/react/16/solid'

export default function Error() {
  return (
    <>
      <ExclamationCircleIcon />
      <Text>Oops, Sign up failed, please try again...</Text>

      <LoginButton />
    </>
  )
}
