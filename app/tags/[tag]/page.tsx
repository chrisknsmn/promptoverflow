import { getFilteredPosts } from "@/lib/prisma"
import SearchContainer from "@/components/layout/search/posts/searchcontainer"

export default async function Page({
  searchParams,
  params
}: {
  searchParams: { q?: string },
  params: any;
}) {
  // const posts = await getPosts(searchParams.q, searchParams.category);
  // console.log(params.tag);
  const posts = await getFilteredPosts(searchParams.q, params.tag);
  // console.log(posts);
  return (
    <div className="py-2 px-4 min-h-[100vh]">
      <SearchContainer params={posts} />
    </div>
  ) 
}
