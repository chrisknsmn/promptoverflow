import Link from 'next/link'
import { navItems } from './navdetails'

const Sidenav = () => {
  return (
    <>
      {/* Sidebar */}
      <div className="hidden md:block border-r bg-background">
        <div className="sticky top-[75px] overflow-y-auto p-2">
          <nav className="space-y-1">
            {navItems.map((item) => (
                <Link 
                    href={item.href}
                    className="flex items-center space-x-3 p-2 rounded-md text-sm font-medium transition-colors hover:bg-accent pr-8"
                >
                    <item.icon className="h-5 w-5" />
                    <span className="text-xs">{item.title}</span>
                </Link>
            ))}
          </nav>
        </div>
      </div>

    </>
  )
}

export default Sidenav