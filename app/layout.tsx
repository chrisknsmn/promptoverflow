import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Sidenav from '@/components/layout/sidenav'
import Adblock from '@/components/layout/adblock'

import './globals.css'
import {
  ClerkProvider,
} from '@clerk/nextjs'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <Header />
          <main className="max-w-screen-2xl mx-auto flex flex-1">
            <Sidenav />
            <Adblock>
              {children}
            </Adblock>
          </main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  )
}