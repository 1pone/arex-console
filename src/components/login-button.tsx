import { Button } from '@/components/button'

export default function LoginButton() {
  return (
    <form className="w-full" action="/api/auth/login">
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  )
}
