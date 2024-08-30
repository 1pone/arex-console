import { logout } from '@/app/(login)/actions'

export async function GET() {
  return logout()
}
