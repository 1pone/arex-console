'use client'

import { login } from '@/app/actions'
import { Field, FieldGroup, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Link } from '@/components/link'
import { Text } from '@/components/text'
import { redirect } from 'next/navigation'
import { toast } from 'react-toastify'
import LoginButton from './loginButton'

export default function Login() {
  async function handleLogin(formData: FormData) {
    const { success, message } = await login(formData)
    toast[success ? 'success' : 'error'](message)
    if (success) redirect('/')
  }

  return (
    <form action={handleLogin} className="w-full max-w-sm space-y-8">
      <Field>
        <FieldGroup>
          <Legend className="">Sign in</Legend>
          <Field>
            <Label>Email</Label>
            <Input name="email" type="email" autoComplete="email" />
          </Field>

          <Field>
            <Label>Password</Label>
            <Input required type="password" name="password" autoComplete="current-password" />
          </Field>

          <div className="flex flex-wrap justify-between gap-2">
            <Field className="flex items-center gap-x-2">
              {/*<Switch />*/}
              {/*<Label>*/}
              {/*  Remember <span className="hidden sm:inline"> me</span>*/}
              {/*</Label>*/}
            </Field>
            <Link href="#" className="font-semibold">
              Forgot password?
            </Link>
          </div>

          <LoginButton />

          <div className="flex gap-1">
            <Text>Don’t have an account?</Text>
            <Link href="/signup" className="font-semibold">
              Sign up
            </Link>
          </div>
        </FieldGroup>
      </Field>
    </form>
  )
}
