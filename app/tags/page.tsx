import { getTags } from "@/lib/prisma"
import SearchContainer from "@/components/layout/search/tags/searchcontainer";

export default async function Page({
  searchParams
}: {
  searchParams: { q?: string }
}) {
  const tags = await getTags(searchParams.q);
  return (
    <div className="py-2 px-4 min-h-[100vh]">
      <SearchContainer tags={tags} />
    </div>
  );
}