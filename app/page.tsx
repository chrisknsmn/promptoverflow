import { getPosts } from "@/lib/prisma"
import SearchContainer from "@/components/layout/search/posts/searchcontainer"

export default async function Page({
  searchParams
}: {
  searchParams: { q?: string }
}) {
  const posts = await getPosts(searchParams.q);
  return (
    <div className="py-2 px-4 min-h-[100vh]">
      <SearchContainer params={posts} />
    </div>
  ) 
}