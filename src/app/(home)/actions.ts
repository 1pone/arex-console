'use server'

import { TENANT_CODE_KEY } from '@/lib/auth'
import http from '@/lib/http'
import { cookies } from 'next/headers'

export type SubscribeUsage = {
  errorCode: number
  memberLimit: number
  memberUsage: number
  success: boolean
  trafficLimitBytes: number
  trafficUsageBytes: number
}

export async function querySubscribeUsage() {
  return http.post<SubscribeUsage>('/api/subscribe/queryUsage', {
    tenantCode: cookies().get(TENANT_CODE_KEY)?.value,
  })
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
}

type AddMemberRes = {
  errorCode: number
  success: boolean
}

export async function addMember(email: string) {
  return http.post<AddMemberRes>('/api/user/mgnt/addUser', {
    tenantCode: cookies().get(TENANT_CODE_KEY)?.value,
    emails: [email],
  })
}

export async function removeMember(email: string) {
  const res = await http.post<AddMemberRes>('/api/user/mgnt/removeUser', {
    tenantCode: cookies().get(TENANT_CODE_KEY)?.value,
    emails: [email],
  })
  return res.success
}
