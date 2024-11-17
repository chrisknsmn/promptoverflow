import { auth } from '@clerk/nextjs/server'
import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  SignInButton,
  SignOutButton,
  SignedOut,
} from '@clerk/nextjs'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { User, UserPlus, LogOut, LogIn, Menu, FilePen } from 'lucide-react'
import Logo from '@/public/LogoComponent';
import { navItems } from './navdetails'

export default function Header() {
  const { userId }: { userId: string | null } = auth()
  return (
    <header className="border-b w-full sticky top-0 left-0 z-10 bg-background/80">
      <div className="max-w-screen-2xl mx-auto px-4 py-2 flex justify-between items-center">
        
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

                <DropdownMenuItem>
                  <span className="w-full border"></span>
                </DropdownMenuItem>

                {userId ? (
                    <>
                      <DropdownMenuItem>
                        <Link href="/dashboard/user" className="flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <SignOutButton>
                          <Link href="/dashboard/user" className="flex items-center">
                              <LogOut className="mr-2 h-4 w-4" />
                              <span>Sign Out</span>
                          </Link>
                        </SignOutButton>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem>
                        <SignedOut>
                          <SignInButton mode="modal">
                            <Link href="/sign-up" className="flex items-center">
                                <LogIn className="mr-2 h-4 w-4" />
                                <span>Sign In</span>
                            </Link>
                          </SignInButton>
                        </SignedOut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <SignedOut>
                          <SignInButton mode="modal">
                            <Link href="/sign-up" className="flex items-center">
                                <FilePen className="mr-2 h-4 w-4" />
                                <span>Sign Up</span>
                            </Link>
                          </SignInButton>
                        </SignedOut>
                      </DropdownMenuItem>
                    </>
                  )
                }
                
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
          
          <div className="hidden md:block text-black dark:text-white mr-2">
            <Logo />
          </div>
          <span className="hidden md:block text-lg">
            Prompt <span className="font-bold">Overflow</span>
          </span>

        </Link>

        <nav className="flex mr-2">
          <div className="block md:hidden text-black dark:text-white mr-1">
            <Logo />
          </div>
          <div className='hidden md:block'>
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
            <div className="space-x-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <Link href="/sign-up" className="text-blue-500 hover:underline">
                    <Button variant="secondary" size="sm">Sign In</Button>
                  </Link>
                </SignInButton>
                <SignInButton mode="modal">
                  <Link href="/sign-up" className="text-blue-500 hover:underline">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </SignInButton>
              </SignedOut>
            </div>
          )}
          </div>

        </nav>

      </div>
    </header>
  );
}