import { cookies } from 'next/headers'

type ResponseType<T> = {
  responseStatusType: {
    responseCode: number
    responseDesc: string
    timestamp: number
  }
  body: T
}

export const ResponseCode = {
  SUCCESS: 0,
  REQUESTED_PARAMETER_INVALID: 1,
  REQUESTED_HANDLE_EXCEPTION: 2,
  REQUESTED_RESOURCE_NOT_FOUND: 3,
  AUTHENTICATION_FAILED: 4,

  APP_AUTH_NO_APP_ID: 105001,
  APP_AUTH_ERROR_APP_ID: 105002,
  APP_AUTH_NO_PERMISSION: 105003,
}

async function http<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(process.env.BASE_URL + url, {
      ...options,
      headers: {
        ...options?.headers,
        'access-token': cookies().get('access-token')?.value || '',
      },
    })
    const responseJson = (await response.json()) as ResponseType<Promise<T>>
    if (responseJson.responseStatusType.responseCode === ResponseCode.SUCCESS) {
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
