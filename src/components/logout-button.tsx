import { Button } from '@/components/button'
import { deleteCookie } from 'cookies-next'

export default function LogoutButton() {
  deleteCookie('auth_verification')
  return (
    <form className="w-full" action="/api/auth/logout">
      <Button type="submit" className="w-full">
        Back
      </Button>
    </form>
  )
}
