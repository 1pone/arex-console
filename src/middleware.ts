import { ACCESS_TOKEN_KEY, NEED_BIND, NEED_BIND_KEY } from '@/lib/auth'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, response: NextResponse) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value
  const needBind = request.cookies.get(NEED_BIND_KEY)?.value
  if (!accessToken) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url))
  } else if (needBind === NEED_BIND.YES) {
    console.log('need bind', accessToken)
    return NextResponse.redirect(
      new URL(`/signup/bind?token=${request.cookies.get(ACCESS_TOKEN_KEY)?.value}`, request.url)
    )
  } else return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/'],
}
