'use client'

import PasswordConfirmForm, { PasswordConfirmFormProps } from '@/app/(login)/components/password-confirm-form'
import { Link } from '@/components/link'
import { Text } from '@/components/text'
import { useSearchParams } from 'next/navigation'
import { register } from '../../actions'

export default function SignupPassword() {
  const searchParams = useSearchParams()

  const handleSignup: PasswordConfirmFormProps['action'] = ({ email, password }) => {
    register({
      email,
      password,
    })
  }

  return (
    <PasswordConfirmForm
      title="Sign Up"
      submitTitle={{
        normal: 'Register Now',
        pending: 'Registering...',
      }}
      email={searchParams.get('email') as string}
      footer={
        <div className="flex gap-1">
          <Text>Already have an account?</Text>
          <Link href="/login" className="font-semibold">
            Sign in
          </Link>
        </div>
      }
      action={handleSignup}
    />
  )
}
