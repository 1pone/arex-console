import { ResponseCodeMap } from '@/constant'
import { cookies } from 'next/headers'

type ResponseType<T> = {
  responseStatusType: {
    responseCode: number
    responseDesc: string
    timestamp: number
  }
  body: T
}

async function http<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(process.env.BASE_URL + url, {
      ...options,
      headers: {
        'access-token': cookies().get('access-token')?.value || '',
        ...options?.headers,
      },
    })
    const responseJson = (await response.json()) as ResponseType<Promise<T>>
    if (responseJson.responseStatusType.responseCode === ResponseCodeMap.SUCCESS) {
      return responseJson.body
    } else {
      throw new Error(responseJson.responseStatusType.responseCode.toString())
    }
  } catch (error) {
    console.error(console.error('Fetch failed:', error))
    throw error
  }
}

interface Http {
  <T>(url: string, options?: RequestInit): Promise<T>
  get: <T>(url: string, options?: RequestInit) => Promise<T>
  post: <T>(url: string, body?: any, options?: RequestInit) => Promise<T>
}

export default Object.assign(http, {
  get<T>(url: string, options?: RequestInit) {
    return http<T>(url, { ...options, method: 'GET' })
  },
  post<T>(url: string, body?: any, options?: RequestInit) {
    return http<T>(url, {
      ...options,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(body),
    })
  },
}) as Http
