'use client'

import { SidebarBody, SidebarItem, SidebarLabel, SidebarSection } from '@/components/sidebar'
import { Cog6ToothIcon, HomeIcon, UsersIcon } from '@heroicons/react/16/solid'
import { usePathname } from 'next/navigation'

export default function SidebarMenu() {
  const pathname = usePathname()

  return (
    <SidebarBody>
      <SidebarSection>
        <SidebarItem href="/" current={pathname === '/'}>
          <HomeIcon />
          <SidebarLabel>Home</SidebarLabel>
        </SidebarItem>
        <SidebarItem href="/member" current={pathname.startsWith('/member')}>
          <UsersIcon />
          <SidebarLabel>Member</SidebarLabel>
        </SidebarItem>
        {/*<SidebarItem href="/orders" current={pathname.startsWith('/orders')}>*/}
        {/*  <TicketIcon />*/}
        {/*  <SidebarLabel>Orders</SidebarLabel>*/}
        {/*</SidebarItem>*/}
        <SidebarItem href="/settings" current={pathname.startsWith('/settings')}>
          <Cog6ToothIcon />
          <SidebarLabel>Settings</SidebarLabel>
        </SidebarItem>
      </SidebarSection>

      {/*<SidebarSection className="max-lg:hidden">*/}
      {/*  <SidebarHeading>Upcoming Events</SidebarHeading>*/}
      {/*  {events.map((event) => (*/}
      {/*    <SidebarItem key={event.id} href={event.url}>*/}
      {/*      {event.name}*/}
      {/*    </SidebarItem>*/}
      {/*  ))}*/}
      {/*</SidebarSection>*/}

      {/*<SidebarSpacer />*/}

      {/*<SidebarSection>*/}
      {/*  <SidebarItem href="#">*/}
      {/*    <QuestionMarkCircleIcon />*/}
      {/*    <SidebarLabel>Support</SidebarLabel>*/}
      {/*  </SidebarItem>*/}
      {/*</SidebarSection>*/}
    </SidebarBody>
  )
}
