import { ErrorCodeEnum, ErrorMessageMap, ResponseCodeMap } from '@/constant'
import ErrorWithCode from '@/lib/ErrorWithCode'
import { cookies } from 'next/headers'

type ResponseType<T> = {
  responseStatusType: {
    responseCode: number
    responseDesc: string
    timestamp: number
  }
  body: T & { success?: boolean; errorCode?: number }
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

    if (!response.ok) {
      throw new ErrorWithCode(`HTTP error! status: ${response.status}`, response.status)
    }

    const responseJson = (await response.json()) as ResponseType<T>
    if (
      responseJson.responseStatusType.responseCode !== ResponseCodeMap.SUCCESS ||
      responseJson.body?.success === false
    ) {
      throw new ErrorWithCode(
        responseJson.responseStatusType.responseDesc,
        responseJson.responseStatusType.responseCode
      )
    } else {
      return responseJson.body as T
    }
  } catch (error) {
    console.error('Fetch failed:', error)
    if (error instanceof ErrorWithCode) throw new ErrorWithCode(error.message, error.code)
    else if (error instanceof Error) throw new ErrorWithCode(error.message)
    else throw new ErrorWithCode(ErrorCodeEnum.UnknownError, ErrorMessageMap[ErrorCodeEnum.UnknownError])
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
