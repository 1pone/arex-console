'use client'

import PasswordStrengthHit from '@/app/(login)/components/password-strength-hit'
import { Field, FieldGroup, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import SubmitButton, { SubmitButtonProps } from '@/components/submit-button'
import { Text } from '@/components/text'
import { passwordReg } from '@/lib/utils'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Fragment, ReactNode, useState } from 'react'

type ActionParams = { email?: string; password: string; accessToken?: string }
export type PasswordConfirmFormProps = {
  title: string
  action: (params: ActionParams) => void
  submitTitle: SubmitButtonProps['title']
  email?: string
  accessToken?: string
  footer?: ReactNode
}

export default function PasswordConfirmForm(props: PasswordConfirmFormProps) {
  const [password, setPassword] = useState('')

  const [passwordInvalid, setPasswordInvalid] = useState(false)
  const [passwordSecInvalid, setPasswordSecInvalid] = useState(false)

  function action(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const accessToken = formData.get('accessToken') as string
    const passwordSec = formData.get('password-sec') as string
    if (!passwordReg.test(password || '')) {
      setPasswordInvalid(true)
    } else if (password !== passwordSec) {
      setPasswordSecInvalid(true)
    } else {
      props.action({
        email,
        password,
        accessToken,
      } as ActionParams)
    }
  }

  return (
    <form action={action} className="w-full max-w-sm space-y-8">
      <Field>
        <FieldGroup>
          <div>
            <Legend>{props.title}</Legend>
            <div>
              <Text className="mt-2 inline !leading-5">Setting a password with a high level of security</Text>
            </div>
          </div>

          <Field hidden>
            <Label>Access Token</Label>
            <Input name="accessToken" defaultValue={props.accessToken} />
          </Field>

          <Field hidden>
            <Label>Email</Label>
            <Input type="email" name="email" defaultValue={props.email} />
          </Field>

          <Field>
            <Label>Password</Label>
            <Popover className="relative">
              <PopoverButton as={Fragment}>
                <Input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  invalid={passwordInvalid}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    passwordInvalid && setPasswordInvalid(false)
                  }}
                />
              </PopoverButton>

              <PopoverPanel
                anchor="bottom"
                className="mt-2 px-4 pb-6 pt-1 text-sm/4 transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
              >
                <PasswordStrengthHit password={password} />
              </PopoverPanel>
            </Popover>
          </Field>

          <Field>
            <Label>Confirm</Label>
            <Input
              type="password"
              name="password-sec"
              autoComplete="new-password"
              invalid={passwordSecInvalid}
              onChange={(e) => {
                passwordSecInvalid && setPasswordSecInvalid(false)
              }}
            />
            {passwordSecInvalid && <Text className="absolute !text-red-600">The passwords do not match</Text>}
          </Field>

          <SubmitButton title={props.submitTitle} />

          {props.footer}
        </FieldGroup>
      </Field>
    </form>
  )
}
