'use client'

import useDelayRedirect from '@/hooks/useDelayRedirect'
import { CheckCircleIcon } from '@heroicons/react/16/solid'

export default function Success() {
  useDelayRedirect('/', 3000)

  return (
    <>
      <CheckCircleIcon />
      Congratulations! Registration was successful and redirection is about to take place...
    </>
  )
}
