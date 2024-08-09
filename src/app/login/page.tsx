'use client'

import { login } from '@/app/actions'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { Field, FieldGroup, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Link } from '@/components/link'
import { Text } from '@/components/text'
import { redirect } from 'next/navigation'
import { toast } from 'react-toastify'

export default async function Login() {
  async function action(data: FormData) {
    const success = await login({
      email: data.get('email')!.toString(),
      password: data.get('password')!.toString(),
    })
    if (success) {
      redirect('/')
    } else {
      toast.error('Password error!')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="h-[36rem] w-[25rem]">
        <div className="relative flex justify-center py-4">
          <div className="text ml-16 px-4 text-3xl font-bold">
            AREX
            <Text className="ml-2 inline font-semibold">Console</Text>
          </div>
        </div>

        <form action={action} className="w-full max-w-sm space-y-8">
          <Field>
            <FieldGroup>
              <Legend className="">Sign in</Legend>
              <Field>
                <Label>Email</Label>
                <Input name="email" type="email" />
              </Field>

              <Field>
                <Label>Password</Label>
                <Input required type="password" name="password" />
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

              <Button type="submit" className="w-full">
                Get started
              </Button>

              <div className="flex gap-1">
                <Text>Don’t have an account?</Text>
                <Link href="/signup" className="font-semibold">
                  Sign up
                </Link>
              </div>
            </FieldGroup>
          </Field>
        </form>
      </Card>
    </div>
  )
}
