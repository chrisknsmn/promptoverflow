import Link from "next/link";
import { auth } from '@clerk/nextjs/server'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { User, Menu } from 'lucide-react'
import { navItems } from './navdetails'
import ThemeToggle from './clrbtn';

import Logo from '@/public/LogoComponent';

export default function Header() {
  const { userId }: { userId: string | null } = auth()
  return (
    <header className="border-b w-full sticky top-0 left-0 z-10 bg-background/80">
      <div className="max-w-screen-2xl mx-auto px-4 py-4 flex justify-between items-center">
        
        <Link href="/" className="text-2xl flex items-center">
          <span className="block md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden mr-2">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.title} asChild>
                    <Link href={item.href} className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
          <div className="text-black dark:text-white mr-2">
            <Logo />
          </div>
          <span className="hidden md:block">
            Prompt <span className="font-bold">Overflow</span>
          </span>
        </Link>

        <nav className="flex">
          {/* <ThemeToggle/> */}
          {userId ? (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/user" className="hover:underline">
                <Button variant="ghost" size="icon">
                  <User  className="h-5 w-5"/>
                  <span className="sr-only">User Profile</span>
                </Button>
              </Link>
              {/* <UserButton afterSignOutUrl="/" /> */}
            </div>
          ) : (
            <div className="space-x-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="text-blue-500 hover:underline">Sign In</button>
                </SignInButton>
                <Link href="/sign-up" className="text-blue-500 hover:underline">Sign Up</Link>
              </SignedOut>
            </div>
          )}.
        </nav>

      </div>
    </header>
  );
}