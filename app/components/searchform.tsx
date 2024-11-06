"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface SearchFormProps {
  onSearch: (formData: FormData) => void;
  isPending: boolean;
}

export default function SearchForm({ onSearch, isPending }: SearchFormProps) {
  const searchParams = useSearchParams();
  return (
    <form
      action={onSearch}
      className="flex flex-col gap-2 sm:flex-row sm:gap-4 max-w-xl"
    >
      <Input
        type="search"
        placeholder="Search"
        name="q"
        defaultValue={searchParams.get("q") ?? ""}
        className="w-full"
      />
      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        <Search className="h-4 w-4 mr-2" />
        {isPending ? "Searching..." : "Search"}
      </Button>
    </form>
  );
}