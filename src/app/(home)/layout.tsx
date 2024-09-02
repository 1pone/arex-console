import AccountDropdownButton from '@/app/(home)/components/accoun-dropdown-button'
import AccountDropdownMenu from '@/app/(home)/components/accoun-dropdown-menu'
import SidebarMenu from '@/app/(home)/components/sidebar-menu'
import { Dropdown } from '@/components/dropdown'
import ArexIcon from '@/components/icon/arex'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar'
import { Sidebar, SidebarFooter, SidebarHeader, SidebarItem, SidebarLabel } from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'
import { Text } from '@/components/text'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <form>
              <Dropdown>
                <AccountDropdownButton as={NavbarItem} />
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

          <SidebarMenu />

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <AccountDropdownButton tenant as={SidebarItem} />
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
