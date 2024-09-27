'use client'

import { bindTenant } from '@/app/(login)/actions'
import { Button } from '@/components/button'
import { Field, FieldGroup, Label, Legend } from '@/components/fieldset'
import HelpTooltip from '@/components/help-tooltip'
import { Input } from '@/components/input'
import SubmitButton from '@/components/submit-button'
import { Text } from '@/components/text'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'

export default function Bind() {
  const searchParams = useSearchParams()

  async function handleBind(formData: FormData) {
    try {
      await bindTenant(formData)
    } catch (e) {
      if (e instanceof Error) toast.error(e.message)
    }
  }

  return (
    <>
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
                <Input required name="tenantCode" />
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

      <form className="mt-4">
        <Button outline plain className="w-full" type="submit" formAction="/api/auth/logout">
          Logout
        </Button>
      </form>
    </>
  )
}
