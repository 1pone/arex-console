'use client'

import { Field, FieldGroup, Label, Legend } from '@/components/fieldset'
import HelpTooltip from '@/components/help-tooltip'
import { Input } from '@/components/input'
import SubmitButton, { SubmitButtonProps } from '@/components/submit-button'
import { Text } from '@/components/text'
import { passwordRegStr } from '@/lib/utils'
import { ReactNode, useRef } from 'react'

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
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordSecRef = useRef<HTMLInputElement>(null)

  function action(formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')
    const accessToken = formData.get('accessToken')
    const passwordSec = formData.get('password-sec')
    if (password !== passwordSec) {
      passwordSecRef.current?.setCustomValidity('The passwords do not match')
      passwordSecRef.current?.reportValidity() // 为了解决第一次submit不会触发 CustomValidity
    } else {
      passwordSecRef.current?.setCustomValidity('')
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
              <Text className="mt-2 inline !leading-5 tracking-tighter">
                Setting a password with a high level of security
              </Text>
              <HelpTooltip>Minimum eight characters, at least one letter and one number</HelpTooltip>
            </div>
          </div>

          <Field hidden>
            <Label>Access Token</Label>
            <Input required name="accessToken" defaultValue={props.accessToken} />
          </Field>

          <Field hidden>
            <Label>Email</Label>
            <Input type="email" name="email" defaultValue={props.email} />
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

          <SubmitButton title={props.submitTitle} />

          {props.footer}
        </FieldGroup>
      </Field>
    </form>
  )
}
