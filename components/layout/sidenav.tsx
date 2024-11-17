"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from './navdetails'
import { cn } from '@/lib/utils'

const Sidenav = () => {
  const pathname = usePathname()
  
  return (
    <>
      {/* Sidebar */}
      <div className="hidden md:block border-r bg-background">
        <div className="sticky top-[60px] overflow-y-auto p-2">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 p-2 rounded-md text-sm font-medium transition-colors hover:bg-accent pr-8",
                    isActive && "bg-accent text-accent-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5",
                    isActive && "text-accent-foreground"
                  )} />
                  <span className="text-xs">{item.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}

export default Sidenav