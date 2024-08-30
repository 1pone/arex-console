import { getTenantInfo } from '@/app/(login)/actions'
import { ACCESS_TOKEN_KEY, authCookiesOptions } from '@/lib/auth'
import http from '@/lib/http'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

type OauthLoginRes =
  | {
      success: true
      errorCode: number
      accessToken: string
      needBind: true
      email: null
    }
  | {
      success: true
      errorCode: number
      accessToken: string
      needBind: false
      email: string
    }
  | {
      success: false
      errorCode: number
      accessToken: string
      needBind: false
      email: null
    }

export async function GET(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')
  const redirectUri =
    (request.headers.get('x-forwarded-proto') || 'https') +
    '://' +
    request.headers.get('x-forwarded-host') +
    '/api/oauth'

  const body = {
    code,
    redirectUri,
    oauthType: 1,
  }
  try {
    const res = await http.post<OauthLoginRes>(`/api/login/oauthLogin`, body)

    console.log({ body, res })

    if (res.success) {
      if (res.needBind) {
        redirect(`/signup/bind?token=${res.accessToken}`)
      } else {
        cookies().set(ACCESS_TOKEN_KEY, res.accessToken, authCookiesOptions)
        const infoRes = await getTenantInfo()
        if (!infoRes?.success) redirect('/verify/error')
      }
    } else {
      redirect('/verify/error')
    }
  } catch (e) {
    if (isRedirectError(e)) throw e
  }
}
