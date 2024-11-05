// components/SearchBar.tsx
'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"

interface SearchBarProps {
  placeholder?: string
  className?: string
}

export function SearchBar({ placeholder = "Search...", className = "" }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  function handleSearch(formData: FormData) {
    const search = formData.get('q')?.toString() || ''
    
    startTransition(() => {
      if (search) {
        router.push(`?q=${search}`)
      } else {
        router.push('/')
      }
    })
  }

  return (
    <form 
      action={handleSearch}
      className={`flex flex-col gap-2 sm:flex-row sm:gap-4 max-w-xl ${className}`}
    >
      <Input
        type="search"
        placeholder={placeholder}
        name="q"
        defaultValue={searchParams.get('q') ?? ''}
        className="w-full"
      />
      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        <Search className="h-4 w-4 mr-2" />
        {isPending ? 'Searching...' : 'Search'}
      </Button>
    </form>
  )
}