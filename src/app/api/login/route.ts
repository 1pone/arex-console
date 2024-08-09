import http from '@/utils/http'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

type LoginRes = {
  success: boolean
  errorCode: number
  accessToken: string
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  console.log('receive post in api', email, password)

  const data = await http.post<LoginRes>('/api/login/login', {
    email,
    password,
  })

  if (data.success && data.accessToken) {
    cookies().set('access-token', data.accessToken)
    return NextResponse.redirect(new URL('/', request.url))
  } else {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
