import { verify } from '@/app/(login)/actions'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { success, accessToken } = await verify(request.nextUrl.searchParams.get('upn'))
  if (success) redirect(`/signup/bind?token=${accessToken}`)
}
