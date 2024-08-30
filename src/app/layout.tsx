import type { Metadata } from 'next'
import type React from 'react'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '@/styles/tailwind.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'

export const metadata: Metadata = {
  title: {
    template: '%s - AREX-Console',
    default: 'AREX-Console',
  },
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-950 dark:text-white">
      <UserProvider>
        <body>
          <ToastContainer
            draggable
            pauseOnHover
            closeOnClick
            hideProgressBar
            pauseOnFocusLoss
            limit={1}
            position="top-right"
            autoClose={3000}
            newestOnTop={false}
            transition={Bounce}
            toastClassName="bg-white dark:bg-zinc-900"
          />
          {children}
        </body>
      </UserProvider>
    </html>
  )
}
