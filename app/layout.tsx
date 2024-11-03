import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import './globals.css'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import Link from 'next/link';

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
          {children}
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  )
}