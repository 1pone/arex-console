import LogoutButton from '@/components/logout-button'
import { Text } from '@/components/text'
import { CheckBadgeIcon } from '@heroicons/react/16/solid'

export default function VerifyEmail() {
  return (
    <>
      <CheckBadgeIcon />
      <Text>Please verify your email to continue...</Text>

      <Text className={'-mb-2 mt-4 text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400'}>Already verified?</Text>

      <LogoutButton />
    </>
  )
}
