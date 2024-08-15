'use client'

import { sendResetPasswordEmail } from '@/app/(login)/actions'
import { Field, FieldGroup, Label, Legend } from '@/components/fieldset'
import { Input } from '@/components/input'
import SubmitButton from '@/components/submit-button'
import { ErrorCode } from '@/constant'
import { toast } from 'react-toastify'

export default function AccountReset() {
  async function handleResetAccount(formData: FormData) {
    const res = await sendResetPasswordEmail(formData.get('email') as string)
    if (!res?.success) res?.errorCode && toast.error(ErrorCode[res?.errorCode.toString()])
  }
  return (
    <form action={handleResetAccount} className="w-full max-w-sm space-y-8">
      <Field>
        <FieldGroup>
          <Legend>Account Reset</Legend>

          <Field>
            <Label>Email</Label>
            <Input required type="email" name="email" />
          </Field>

          <SubmitButton
            title={{
              normal: 'Send Verify Email',
              pending: 'Send...',
            }}
          />
        </FieldGroup>
      </Field>
    </form>
  )
}
