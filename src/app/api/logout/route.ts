import {
  ACCESS_TOKEN_KEY,
  EMAIL_KEY,
  TENANT_CODE_KEY,
  TENANT_EXPIRE_KEY,
  TENANT_NAME_KEY,
  TENANT_TOKEN_KEY,
} from '@/lib/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  cookies().delete(EMAIL_KEY)
  cookies().delete(ACCESS_TOKEN_KEY)
  cookies().delete(TENANT_NAME_KEY)
  cookies().delete(TENANT_CODE_KEY)
  cookies().delete(TENANT_TOKEN_KEY)
  cookies().delete(TENANT_EXPIRE_KEY)
  return redirect('/login')
}
