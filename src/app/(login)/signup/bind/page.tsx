'use client'

import { bindTenant } from '@/app/(login)/actions'
import { Field, FieldGroup, Label, Legend } from '@/components/fieldset'
import HelpTooltip from '@/components/help-tooltip'
import { Input } from '@/components/input'
import SubmitButton from '@/components/submit-button'
import { Text } from '@/components/text'
import { ErrorCode } from '@/constant'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'

export default function Bind() {
  const searchParams = useSearchParams()

  async function handleBind(formData: FormData) {
    const res = await bindTenant(formData)
    if (!res.success) toast.error(ErrorCode[res.errorCode.toString()])
  }

  return (
    <form action={handleBind} className="w-full max-w-sm space-y-8">
      <Field>
        <FieldGroup>
          <Legend>Bind Tenant</Legend>

          <Field hidden>
            <Label>Access Token</Label>
            <Input required name="accessToken" defaultValue={searchParams.get('token') as string} />
          </Field>

          <Field>
            <Label>Tenant Name</Label>
            <Input required minLength={2} maxLength={63} name="tenantName" />
          </Field>

          <Field>
            <Label>
              Tenant Code
              <HelpTooltip title="Tenant code will be used for the domain name and will not be able to be modified after confirmation" />
            </Label>
            <div className="mt-3 flex">
              <Input minLength={2} pattern="^[a-zA-Z0-9\-]{2,61}$" name="tenantCode" />
              <Text className="ps-2 !text-sm/8">.arextest.com</Text>
            </div>
          </Field>

          <SubmitButton
            title={{
              normal: 'Bind Tenant',
              pending: 'Binding...',
            }}
          />
        </FieldGroup>
      </Field>
    </form>
  )
}
