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
import http from '@/utils/http'
import { cookies } from 'next/headers'

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

export const login = async (params: { email: string; password: string }) => {
  const data = await http.post<LoginRes>('/api/login/login', {
    email: params.email,
    password: params.password,
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
      return true
    } catch (e) {
      return false
    }
  } else {
    return false
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
