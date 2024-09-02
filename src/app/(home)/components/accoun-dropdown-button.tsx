import { Avatar } from '@/components/avatar'
import { DropdownButton } from '@/components/dropdown'
import { NavbarItem } from '@/components/navbar'
import { SidebarItem } from '@/components/sidebar'
import { EMAIL_KEY, TENANT_NAME_KEY } from '@/lib/auth'
import { ChevronUpIcon } from '@heroicons/react/16/solid'
import { cookies } from 'next/headers'

export default async function AccountDropdownButton({
  tenant,
  as,
}: {
  tenant?: boolean
  as: typeof SidebarItem | typeof NavbarItem
}) {
  const _email = cookies().get(EMAIL_KEY)?.value
  const _tenant = cookies().get(TENANT_NAME_KEY)?.value

  return (
    <DropdownButton as={as}>
      <div className="flex min-w-0 items-center gap-3">
        <Avatar initials={_email?.[0]} className="size-10" square alt="" />
        {tenant && (
          <div className="min-w-0">
            <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">{_email}</span>
            <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">{_tenant}</span>
          </div>
        )}
      </div>
      <ChevronUpIcon />
    </DropdownButton>
  )
}
