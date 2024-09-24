'use server'

import { ErrorCodeEnum } from '@/constant'
import {
  ACCESS_TOKEN_KEY,
  authCookiesOptions,
  EMAIL_KEY,
  NEED_BIND,
  NEED_BIND_KEY,
  TENANT_CODE_KEY,
  TENANT_EXPIRE_KEY,
  TENANT_NAME_KEY,
  TENANT_TOKEN_KEY,
} from '@/lib/auth'
import http from '@/lib/http'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

type LoginRes =
  | {
      success: true
      errorCode: null
      accessToken: string
    }
  | {
      success: false
      errorCode: number
      accessToken: null
    }

export type QueryTenantRes = {
  success: boolean
  errorCode: number
  user: {
    email: string
    tenantName: string
    tenantCode: string
    userLevel: number
    expireTime: number
    tenantToken: string
    tenantStatus: number
  }
}

const loginFailedReturn = {
  success: false,
  message: 'Login failed, please check your email or password.',
}

export async function logout(options?: { redirect?: boolean }) {
  const { redirect: _redirect = true } = options || {}

  cookies().delete(EMAIL_KEY)
  cookies().delete(ACCESS_TOKEN_KEY)
  cookies().delete(TENANT_NAME_KEY)
  cookies().delete(TENANT_CODE_KEY)
  cookies().delete(TENANT_TOKEN_KEY)
  cookies().delete(TENANT_EXPIRE_KEY)
  cookies().delete(NEED_BIND_KEY)

  return _redirect && redirect('/login')
}

export async function getTenantInfo(options?: { redirect?: boolean }) {
  const { redirect: _redirect = true } = options || {}
  if (!cookies().get(ACCESS_TOKEN_KEY)) return loginFailedReturn
  try {
    const tenantInfo = await http.post<QueryTenantRes>('/api/login/queryTenant')
    cookies().set(EMAIL_KEY, tenantInfo.user.email, authCookiesOptions)
    cookies().set(TENANT_NAME_KEY, tenantInfo.user.tenantName, authCookiesOptions)
    cookies().set(TENANT_CODE_KEY, tenantInfo.user.tenantCode, authCookiesOptions)
    cookies().set(TENANT_TOKEN_KEY, tenantInfo.user.tenantToken, authCookiesOptions)
    cookies().set(TENANT_EXPIRE_KEY, tenantInfo.user.expireTime.toString(), authCookiesOptions)
    _redirect && redirect('/')
  } catch (e) {
    // https://github.com/vercel/next.js/issues/49298#issuecomment-1537433377
    if (isRedirectError(e)) throw e
    return loginFailedReturn
  }
}

export async function bindTenant(formData: FormData) {
  const schema = z.object({
    accessToken: z.string(),
    tenantName: z.string().min(2),
    tenantCode: z.string().min(2),
  })

  const parse = schema.safeParse({
    accessToken: formData.get('accessToken'),
    tenantName: formData.get('tenantName'),
    tenantCode: formData.get('tenantCode'),
  })

  if (!parse.success)
    return {
      success: false,
      errorCode: ErrorCodeEnum.ParameterParsingError,
    }

  const res = await http.post<LoginRes>(
    '/api/login/bind',
    {
      tenantName: parse.data.tenantName,
      tenantCode: parse.data.tenantCode,
    },
    {
      headers: {
        'access-token': parse.data.accessToken,
      },
    }
  )

  if (!res.success) return res
  else {
    cookies().set(ACCESS_TOKEN_KEY, res.accessToken, authCookiesOptions)
    cookies().set(NEED_BIND_KEY, NEED_BIND.NO)

    await getTenantInfo()
  }
}
