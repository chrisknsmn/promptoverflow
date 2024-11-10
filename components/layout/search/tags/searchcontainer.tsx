"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import SearchForm from "./searchform";
import Tags from "./loadedtags";
import Loading from "./loading";

import type { TagProps } from "@/types/tags";

export default function SearchContainer({ tags }: TagProps) {
  
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSearch(formData: FormData) {
    const search = formData.get("q")?.toString() || "";
    startTransition(() => {
      if (search) {
        router.push(`?q=${search}`);
      } else {
        router.push("/tags");
      }
    });
  }

  return (
    <>
      <SearchForm onSearch={handleSearch} isPending={isPending} />
      <div className="mt-4">
        {isPending ? (
          <Loading />
        ) : (
          <Tags tags={tags} />
        )}
      </div>
    </>
  );
}