import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  cookies().delete('access-token')
  return NextResponse.redirect(new URL('/login', request.url))
}
