'use server'

import { ErrorCodeEnum } from '@/constant'
import {
  ACCESS_TOKEN_KEY,
  authCookiesOptions,
  EMAIL_KEY,
  TENANT_CODE_KEY,
  TENANT_EXPIRE_KEY,
  TENANT_NAME_KEY,
  TENANT_TOKEN_KEY,
} from '@/lib/auth'
import http from '@/lib/http'
import { passwordReg } from '@/lib/utils'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

type LoginRes = {
  success: boolean
  errorCode: number
  accessToken: string
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

export const login = async (formData: FormData) => {
  const failedReturn = {
    success: false,
    message: 'Login failed, please check your email or password.',
  }

  const schema = z.object({
    email: z.string().email(),
    password: z.string(),
  })
  const parse = schema.safeParse({
    password: formData.get('password'),
    email: formData.get('email'),
  })

  if (!parse.success) return failedReturn

  const data = await http.post<LoginRes>('/api/login/login', {
    password: parse.data.password,
    email: parse.data.email,
  })

  if (data.success && data.accessToken) {
    cookies().set(ACCESS_TOKEN_KEY, data.accessToken, authCookiesOptions)
    try {
      const tenantInfo = await http.post<QueryTenantRes>('/api/login/queryTenant')
      cookies().set(EMAIL_KEY, tenantInfo.user.email, authCookiesOptions)
      cookies().set(TENANT_NAME_KEY, tenantInfo.user.tenantName, authCookiesOptions)
      cookies().set(TENANT_CODE_KEY, tenantInfo.user.tenantCode, authCookiesOptions)
      cookies().set(TENANT_TOKEN_KEY, tenantInfo.user.tenantToken, authCookiesOptions)
      cookies().set(TENANT_EXPIRE_KEY, tenantInfo.user.expireTime.toString(), authCookiesOptions)
      return redirect('/')
    } catch (e) {
      // https://github.com/vercel/next.js/issues/49298#issuecomment-1537433377
      if (isRedirectError(e)) throw e
      return failedReturn
    }
  } else {
    return failedReturn
  }
}

type RegisterRes = { success: boolean; errorCode: number }

export async function register(params: { email: string; password: string }) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().regex(passwordReg),
  })

  const parse = schema.safeParse(params)

  if (!parse.success) {
    return redirect('/signup/error')
  } else {
    const res = await http.post<RegisterRes>('/api/login/register', {
      ...parse.data,
    })

    if (res.success) return redirect('/signup/almost/success')
    else return redirect('/signup/error')
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
  else redirect(`/signup/success`)
}
