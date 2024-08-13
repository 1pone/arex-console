import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const email = params.get('email')
  return email && redirect(`/signup/password?email=${email}`)
}
