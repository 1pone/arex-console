'use client'

import { register } from '@/app/actions'
import { Field, FieldGroup, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Link } from '@/components/link'
import { Text } from '@/components/text'
import { passwordRegStr } from '@/lib/utils'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { QuestionMarkCircleIcon } from '@heroicons/react/16/solid'
import { useSearchParams } from 'next/navigation'
import { useRef } from 'react'
import RegisterButton from './registerButton'

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
      console.log(formData.get(''), password)
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
              <Popover className="relative inline">
                <PopoverButton className="ml-1.5 inline h-2.5 w-3 text-black/50 focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-black dark:text-white/50 dark:data-[active]:text-white dark:data-[hover]:text-white dark:data-[focus]:outline-white">
                  <QuestionMarkCircleIcon />
                </PopoverButton>
                <PopoverPanel
                  transition
                  anchor="right"
                  className="ml-2 w-60 divide-y divide-white/5 rounded-xl bg-black/5 px-3 py-2 text-sm transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0 dark:bg-white/5"
                >
                  Minimum eight characters, at least one letter and one number
                </PopoverPanel>
              </Popover>
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

          <RegisterButton />

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
