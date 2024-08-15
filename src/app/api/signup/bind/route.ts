import http from '@/lib/http'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

type VerifyRes =
  | { success: true; errorCode: number; accessToken: string }
  | { success: false; errorCode: number; accessToken: null }

export async function GET(request: NextRequest) {
  const upn = request.nextUrl.searchParams.get('upn')

  if (upn) {
    const res = await http.post<VerifyRes>('/api/login/verify', {
      upn,
    })
    if (res.success) {
      redirect(`/signup/bind?token=${res.accessToken}`)
    } else {
      redirect(`/verify/error?code=${res.errorCode}`)
    }
  } else redirect('/verify/error')
}
