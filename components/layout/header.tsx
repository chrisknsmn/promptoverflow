import Link from "next/link";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

import Image from 'next/image';

export default function Header() {
  const { userId }: { userId: string | null } = auth()
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl flex items-center">
          <Image 
            src="/logo.svg"
            alt="Logo"
            width={30}
            height={30}
            className="mr-2"
          />
          <span>
            Prompt <span className="font-bold">Overflow</span>
          </span>
        </Link>
        <nav>
          {userId ? (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/user" className="text-blue-500 hover:underline">Profile</Link>
            </div>
          ) : (
            <div className="space-x-4">
              <SignedOut>
                <Link href="/packages/auth-clerk/sign-in" className="text-blue-500 hover:underline">Sign In</Link>
                <Link href="/packages/auth-clerk/sign-up" className="text-blue-500 hover:underline">Sign Up</Link>
              </SignedOut>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}