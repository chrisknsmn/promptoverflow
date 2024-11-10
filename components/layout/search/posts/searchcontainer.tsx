"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import SearchForm from "./searchform";
import Posts from "./loadedposts";
import Loading from "./loading";

import type { PostsProps } from "@/types/post";

export default function SearchContainer({ params }: PostsProps) {
  
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  function handleSearch(formData: FormData) {
    const search = formData.get("q")?.toString() || "";
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("q", search);
    } else {
      params.delete("q");
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <>
      <SearchForm onSearch={handleSearch} isPending={isPending} />
      <div className="border rounded-sm mt-4">
        {isPending ? (
          <Loading />
        ) : (
          <Posts params={params} />
        )}
      </div>
    </>
  );
}
