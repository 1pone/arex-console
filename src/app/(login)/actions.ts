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

export const login = async (formData: FormData) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string(),
  })
  const parse = schema.safeParse({
    password: formData.get('password'),
    email: formData.get('email'),
  })

  if (!parse.success) return loginFailedReturn

  const data = await http.post<LoginRes>('/api/login/login', {
    password: parse.data.password,
    email: parse.data.email,
  })

  if (data.success && data.accessToken) {
    cookies().set(ACCESS_TOKEN_KEY, data.accessToken, authCookiesOptions)
    return await getTenantInfo()
  } else {
    return loginFailedReturn
  }
}

export async function getTenantInfo() {
  if (!cookies().get(ACCESS_TOKEN_KEY)) return loginFailedReturn
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
    return loginFailedReturn
  }
}

type VerifyRes =
  | { success: true; errorCode: number; accessToken: string }
  | { success: false; errorCode: number; accessToken: null }

export async function verify(upn?: string | null) {
  if (upn) {
    const res = await http.post<VerifyRes>('/api/login/verify', {
      upn,
    })
    if (res.success) {
      return Promise.resolve(res)
    } else {
      redirect(`/verify/error?code=${res.errorCode}`)
    }
  } else {
    redirect('/verify/error')
  }
}

type RegisterRes = { success: boolean; errorCode: number }

export async function register(params: { email?: string; password?: string }) {
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

  console.log(res)
  if (!res.success) return res
  else redirect(`/signup/success`)
}

export async function sendResetPasswordEmail(email: string) {
  const schema = z.string().email()

  const parse = schema.safeParse(email)

  if (!parse.success)
    return {
      success: false,
      errorCode: ErrorCodeEnum.ParameterParsingError,
    }

  try {
    const success = await http.post<boolean>('/api/login/sendResetPwdEmail', {
      email: parse.data,
    })
    if (success) redirect('/account/reset/send-verify-email')
  } catch (e) {
    if (isRedirectError(e)) throw e
    return { success: false, errorCode: (e as Error).message }
  }
}

export async function resetPassword(params: { password: string; accessToken?: string }) {
  const schema = z.object({
    password: z.string().regex(passwordReg),
    accessToken: z.string().min(1),
  })

  const parse = schema.safeParse(params)

  if (!parse.success) {
    return {
      success: false,
      errorCode: ErrorCodeEnum.ParameterParsingError,
    }
  } else {
    try {
      const success = await http.post<boolean>(
        '/api/login/resetPassword',
        {
          password: parse.data.password,
        },
        {
          headers: {
            'access-token': parse.data.accessToken,
          },
        }
      )

      if (success) {
        redirect('/account/reset/success')
      }
    } catch (e) {
      if (isRedirectError(e)) throw e
      else return { success: false, errorCode: (e as Error).message }
    }
  }
}
