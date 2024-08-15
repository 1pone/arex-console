'use client'

import { Field, FieldGroup, Label, Legend } from '@/components/fieldset'
import HelpTooltip from '@/components/help-tooltip'
import { Input } from '@/components/input'
import { Link } from '@/components/link'
import SubmitButton from '@/components/submit-button'
import { Text } from '@/components/text'
import { passwordRegStr } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { useRef } from 'react'
import { register } from '../../actions'

export default function SignupPassword() {
  const searchParams = useSearchParams()
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordSecRef = useRef<HTMLInputElement>(null)

  function handleSignup(formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')
    const passwordSec = formData.get('password-sec')
    if (password !== passwordSec) {
      passwordSecRef.current?.setCustomValidity('The passwords do not match')
      passwordSecRef.current?.reportValidity() // 为了解决第一次submit不会触发 CustomValidity
    } else {
      passwordSecRef.current?.setCustomValidity('')
      register({
        email: email as string,
        password: password as string,
      })
    }
  }

  return (
    <form action={handleSignup} className="w-full max-w-sm space-y-8">
      <Field>
        <FieldGroup>
          <div>
            <Legend>Sign Up</Legend>
            <div>
              <Text className="mt-2 inline !leading-5 tracking-tighter">
                Setting a password with a high level of security
              </Text>
              <HelpTooltip>Minimum eight characters, at least one letter and one number</HelpTooltip>
            </div>
          </div>

          <Field hidden>
            <Label>Email</Label>
            <Input required type="email" name="email" defaultValue={searchParams.get('email') as string} />
          </Field>

          <Field>
            <Label>Password</Label>
            <Input
              required
              ref={passwordRef}
              minLength={8}
              pattern={passwordRegStr}
              type="password"
              name="password"
              autoComplete="new-password"
              onChange={(e) => {
                e.currentTarget.setCustomValidity('')
              }}
            />
          </Field>

          <Field>
            <Label>Confirm</Label>
            <Input
              required
              ref={passwordSecRef}
              type="password"
              name="password-sec"
              autoComplete="new-password"
              onChange={(e) => {
                e.currentTarget.setCustomValidity('')
              }}
            />
          </Field>

          <SubmitButton
            title={{
              normal: 'Register Now',
              pending: 'Registering...',
            }}
          />

          <div className="flex gap-1">
            <Text>Already have an account?</Text>
            <Link href="/login" className="font-semibold">
              Sign in
            </Link>
          </div>
        </FieldGroup>
      </Field>
    </form>
  )
}
