'use client'

import { Avatar } from '@/components/avatar'
import { Dropdown, DropdownButton, DropdownItem, DropdownLabel, DropdownMenu } from '@/components/dropdown'
import ArexIcon from '@/components/icon/arex'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'
import { Text } from '@/components/text'
import { EMAIL_KEY, TENANT_NAME_KEY } from '@/lib/auth'
import { ArrowRightStartOnRectangleIcon, ChevronUpIcon } from '@heroicons/react/16/solid'
import { Cog6ToothIcon, HomeIcon, UsersIcon } from '@heroicons/react/20/solid'
import { getCookie } from 'cookies-next'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
  return (
    <>
      <DropdownMenu className="min-w-64" anchor={anchor}>
        <form className="contents">
          {/*<DropdownItem href="#">*/}
          {/*  <UserCircleIcon />*/}
          {/*  <DropdownLabel>My account</DropdownLabel>*/}
          {/*</DropdownItem>*/}
          {/*<DropdownDivider />*/}
          {/*<DropdownItem href="#">*/}
          {/*  <ShieldCheckIcon />*/}
          {/*  <DropdownLabel>Privacy policy</DropdownLabel>*/}
          {/*</DropdownItem>*/}
          {/*<DropdownItem href="#">*/}
          {/*  <LightBulbIcon />*/}
          {/*  <DropdownLabel>Share feedback</DropdownLabel>*/}
          {/*</DropdownItem>*/}
          {/*<DropdownDivider />*/}

          <DropdownItem type={undefined} formAction="/api/logout">
            <ArrowRightStartOnRectangleIcon />
            <DropdownLabel>Sign out</DropdownLabel>
          </DropdownItem>
        </form>
      </DropdownMenu>
    </>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const [email, setEmail] = useState<string>()
  const [tenant, setTenant] = useState<string>()

  useEffect(() => {
    setEmail(getCookie(EMAIL_KEY))
    setTenant(getCookie(TENANT_NAME_KEY))
  }, [])

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <form>
              <Dropdown>
                <DropdownButton as={NavbarItem}>
                  <Avatar initials={email?.[0]} square />
                </DropdownButton>
                <AccountDropdownMenu anchor="bottom end" />
              </Dropdown>
            </form>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <SidebarItem href="/" className="group">
              <ArexIcon className="grayscale group-hover:brightness-100 group-hover:grayscale-0 dark:brightness-150" />
              <SidebarLabel className="text-lg font-bold">
                AREX <Text className="inline">Console</Text>
              </SidebarLabel>
            </SidebarItem>
          </SidebarHeader>

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

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <Avatar initials={email?.[0]} className="size-10" square alt="" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white"> {email}</span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {tenant}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
