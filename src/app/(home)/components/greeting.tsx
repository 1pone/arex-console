'use client'

import { Heading } from '@/components/heading'
import { EMAIL_KEY } from '@/lib/auth'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'

export default function Greeting() {
  const [nickname, setNickname] = useState<string>()
  useEffect(() => {
    const email = getCookie(EMAIL_KEY)
    setNickname(email?.split('@')?.[0])
  }, [])

  return (
    <Heading>
      Good {new Date().getHours() > 12 ? 'afternoon' : 'morning'}, {nickname}
    </Heading>
  )
}
