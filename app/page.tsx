import { getPosts } from "@/lib/prisma"
import { SearchBar } from "@/components/layout/searchbar"
import DisplayPosts from "@/app/components/displayposts"

export default async function Home({
  searchParams
}: {
  searchParams: { q?: string }
}) {
  const posts = await getPosts(searchParams.q);
  return (
    <div className="container mx-auto py-2 px-4">
      <SearchBar
        placeholder="Search posts..."
        className="mb-4"
      />
      <DisplayPosts posts={posts} />
    </div>
  )
}