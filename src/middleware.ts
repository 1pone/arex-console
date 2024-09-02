import { ACCESS_TOKEN_KEY } from '@/lib/auth'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, response: NextResponse) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)
  if (!!accessToken) {
    return NextResponse.next()
  } else return NextResponse.redirect(new URL('/api/auth/login', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/'],
}
