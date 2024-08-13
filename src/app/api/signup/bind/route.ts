import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const upn = request.nextUrl.searchParams.get('upn')

  if (upn) {
    console.log(upn)
    redirect('/verify/success')
  } else redirect('/verify/error')
}
