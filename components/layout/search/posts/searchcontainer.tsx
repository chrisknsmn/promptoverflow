"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import SearchForm from "./searchform";
import Posts from "./loadedposts";
import Loading from "./loading";

import type { PostsProps } from "@/types/post";

export default function SearchContainer({ params }: PostsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  function handleSearch(formData: FormData) {
    const search = formData.get("q")?.toString() || "";
    startTransition(() => {
      if (search) {
        router.push(`?q=${search}`);
      } else {
        router.push("/");
      }
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
