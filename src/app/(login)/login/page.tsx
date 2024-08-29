'use client'

import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Field, FieldGroup, Label, Legend } from '@/components/fieldset'
import GoogleIcon from '@/components/icon/google'
import { Input } from '@/components/input'
import { Link } from '@/components/link'
import SubmitButton from '@/components/submit-button'
import { Text } from '@/components/text'
import { redirect } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { login } from '../actions'

export default function Login() {
  const url = useRef(new URL('https://accounts.google.com/o/oauth2/auth'))
  useEffect(() => {
    const params = {
      response_type: 'code',
      state: 'STATE',
      scope: 'https://www.googleapis.com/auth/userinfo.email',
      client_id: '321806507825-7ajin7m8v3bt0td6hg9bf8r2iulh4c70.apps.googleusercontent.com',
      redirect_uri: window.location.origin + '/api/oauth',
    }
    url.current.search = new URLSearchParams(params).toString()
  }, [])

  async function handleLogin(formData: FormData) {
    const { success, message } = await login(formData)
    toast[success ? 'success' : 'error'](message)
    if (success) redirect('/')
  }

  function handleGoogleOauth() {
    window.location.href = url.current.toString()
  }

  return (
    <form action={handleLogin} className="w-full max-w-sm">
      <Field>
        <FieldGroup>
          <Legend className="">Sign in</Legend>
          <Field>
            <Label>Email</Label>
            <Input required name="email" type="email" autoComplete="email" />
          </Field>

          <Field>
            <Label>Password</Label>
            <Input required type="password" name="password" autoComplete="current-password" />
            <Link href="/account/reset" className="float-right mt-2 font-semibold">
              Forgot password?
            </Link>
          </Field>

          <SubmitButton
            title={{
              normal: 'Sign in',
              pending: 'Signing in...',
            }}
          />
        </FieldGroup>
      </Field>

      <div className="flex items-center gap-x-2 py-2">
        <Divider />
        <Text>OR</Text>
        <Divider />
      </div>

      <Button className="group w-full" onClick={handleGoogleOauth}>
        <GoogleIcon className="brightness-150 grayscale group-hover:brightness-100 group-hover:grayscale-0" />
        Login with Google
      </Button>

      <div className="float-right mt-2 flex gap-1">
        <Text>Don&#39;t have an account?</Text>
        <Link href="/signup" className="font-semibold">
          Sign up
        </Link>
      </div>
    </form>
  )
}
