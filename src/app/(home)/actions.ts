'use server'

import { TENANT_CODE_KEY } from '@/lib/auth'
import http from '@/lib/http'
import { cookies } from 'next/headers'

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
  console.log(data)
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
  try {
    return await http.post<AddMemberRes>('/api/user/mgnt/addUser', {
      tenantCode: cookies().get(TENANT_CODE_KEY)?.value,
      emails: [email],
    })
  } catch (errorCode: unknown) {
    return {
      success: false,
      errorCode,
    }
  }
}

export async function removeMember(email: string) {
  const res = await http.post<AddMemberRes>('/api/user/mgnt/removeUser', {
    tenantCode: cookies().get(TENANT_CODE_KEY)?.value,
    emails: [email],
  })
  return res.success
}
