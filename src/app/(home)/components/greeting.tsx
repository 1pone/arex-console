import { Heading } from '@/components/heading'
import { EMAIL_KEY } from '@/lib/auth'
import { cookies } from 'next/headers'

export default function Greeting() {
  const hours = new Date().getHours()
  const timePeriod = hours > 16 ? 'night' : hours > 12 ? 'afternoon' : 'morning'
  return (
    <Heading>
      Good {timePeriod}, {cookies().get(EMAIL_KEY)?.value.split('@')?.[0]}.
    </Heading>
  )
}
