import TenantToken from '@/app/(home)/settings/tenant-token'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { Text, TextLink } from '@/components/text'
import { TENANT_CODE_KEY, TENANT_NAME_KEY } from '@/lib/auth'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function Settings() {
  const _cookies = cookies()

  return (
    <form method="post" className="mx-auto max-w-4xl">
      <Heading>Settings</Heading>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Tenant Name</Subheading>
          {/*<Text>This will be displayed on your public profile.</Text>*/}
        </div>
        <div>
          <Input
            disabled
            aria-label="Tenant Name"
            name="tenant-name"
            defaultValue={_cookies.get(TENANT_NAME_KEY)?.value}
          />
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Tenant Code</Subheading>
          <Text>
            Tenant code is the unique identifier of the tenant, and will be used for the domain name. Visit{' '}
            <TextLink href={`https://${_cookies.get(TENANT_CODE_KEY)?.value}.arextest.com`}>
              {_cookies.get(TENANT_CODE_KEY)?.value}.arextest.com
            </TextLink>
          </Text>
        </div>
        <div>
          <Input
            disabled
            aria-label="Tenant Code"
            name="tenant-code"
            defaultValue={_cookies.get(TENANT_CODE_KEY)?.value}
          />
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Tenant Token</Subheading>
          <Text>Tenant Token is use for activate AREX Agent</Text>
        </div>
        <div>
          <TenantToken />
        </div>
      </section>

      {/*<Divider className="my-10" soft />*/}

      {/*<section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">*/}
      {/*  <div className="space-y-1">*/}
      {/*    <Subheading>Organization Email</Subheading>*/}
      {/*    <Text>This is how customers can contact you for support.</Text>*/}
      {/*  </div>*/}
      {/*  <div className="space-y-4">*/}
      {/*    <Input type="email" aria-label="Organization Email" name="email" defaultValue="info@example.com" />*/}
      {/*    <CheckboxField>*/}
      {/*      <Checkbox name="email_is_public" defaultChecked />*/}
      {/*      <Label>Show email on public profile</Label>*/}
      {/*    </CheckboxField>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/*<Divider className="my-10" soft />*/}

      {/*<section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">*/}
      {/*  <div className="space-y-1">*/}
      {/*    <Subheading>Address</Subheading>*/}
      {/*    <Text>This is where your organization is registered.</Text>*/}
      {/*  </div>*/}
      {/*  <Address />*/}
      {/*</section>*/}

      {/*<Divider className="my-10" soft />*/}

      {/*<section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">*/}
      {/*  <div className="space-y-1">*/}
      {/*    <Subheading>Currency</Subheading>*/}
      {/*    <Text>The currency that your organization will be collecting.</Text>*/}
      {/*  </div>*/}
      {/*  <div>*/}
      {/*    <Select aria-label="Currency" name="currency" defaultValue="cad">*/}
      {/*      <option value="cad">CAD - Canadian Dollar</option>*/}
      {/*      <option value="usd">USD - United States Dollar</option>*/}
      {/*    </Select>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/*<Divider className="my-10" soft />*/}

      {/*<div className="flex justify-end gap-4">*/}
      {/*  <Button type="reset" plain>*/}
      {/*    Reset*/}
      {/*  </Button>*/}
      {/*  <Button type="submit">Save changes</Button>*/}
      {/*</div>*/}
    </form>
  )
}
