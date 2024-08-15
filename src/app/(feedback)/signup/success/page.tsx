'use client'

import { CheckCircleIcon } from '@heroicons/react/16/solid'
import { redirect } from 'next/navigation'
import { useEffect, useTransition } from 'react'

export default function Success() {
  const [, startTransition] = useTransition()

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        // https://github.com/vercel/next.js/issues/59489
        startTransition(() => redirect('/login')),
      3000
    )
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <CheckCircleIcon />
      Congratulations! Registration was successful and redirection is about to take place...
    </>
  )
}
