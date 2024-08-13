'use server'

import {
  ACCESS_TOKEN_KEY,
  authCookiesOptions,
  EMAIL_KEY,
  TENANT_CODE_KEY,
  TENANT_EXPIRE_KEY,
  TENANT_NAME_KEY,
  TENANT_TOKEN_KEY,
} from '@/lib/auth'
import { passwordReg } from '@/lib/utils'
import http from '@/utils/http'
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
    password: z.string().min(6),
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
      return {
        success: true,
        message: 'Login Successfully',
      }
    } catch (e) {
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

    if (res.success) return redirect('/signup/success')
    else return redirect('/signup/error')
  }
}

type SubscribeUsage = {
  errorCode: number
  memberLimit: number
  memberUsage: number
  success: boolean
  trafficLimitBytes: number
  trafficUsageBytes: number
}

export async function querySubscribeUsage() {
  const data = await http.post<SubscribeUsage>('/api/subscribe/queryUsage', {
    tenantCode: cookies().get(TENANT_CODE_KEY)?.value,
  })
  if (data.success) return data
}

type Member = {
  errorCode: 0
  success: true
  userEmails: string[]
}

export async function queryMember() {
  const data = await http.post<Member>('/api/user/mgnt/queryUserEmails', {
    tenantCode: cookies().get(TENANT_CODE_KEY)?.value,
  })
  if (data.success) return data.userEmails
  else return []
}

type AddMemberRes = {
  errorCode: number
  success: boolean
}

export async function addMember(email: string) {
  const res = await http.post<AddMemberRes>('/api/user/mgnt/addUser', {
    tenantCode: cookies().get(TENANT_CODE_KEY)?.value,
    emails: [email],
  })
  return res.success
}

export async function removeMember(email: string) {
  const res = await http.post<AddMemberRes>('/api/user/mgnt/removeUser', {
    tenantCode: cookies().get(TENANT_CODE_KEY)?.value,
    emails: [email],
  })
  return res.success
}
