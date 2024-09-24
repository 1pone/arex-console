'use client'

import { redirect } from 'next/navigation'
import { useEffect, useTransition } from 'react'

export default function useDelayRedirect(url: string, delay: number) {
  const [, startTransition] = useTransition()

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        // https://github.com/vercel/next.js/issues/59489
        startTransition(() => redirect(url)),
      delay
    )
    return () => clearTimeout(timeout)
  }, [delay, url])
}
