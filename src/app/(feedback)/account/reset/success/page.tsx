'use client'

import useDelayRedirect from '@/hooks/useDelayRedirect'
import { CheckCircleIcon } from '@heroicons/react/16/solid'

export default function AccountResetSuccess() {
  useDelayRedirect('/login', 3000)

  return (
    <>
      <CheckCircleIcon />
      All changes have taken effect! Redirection is about to take place...
    </>
  )
}
