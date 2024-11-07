import { getQuestions } from "@/lib/prisma"
import SearchContainer from "@/components/layout/search/posts/searchcontainer"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function Page({
  searchParams
}: {
  searchParams: { q?: string }
}) {
  const posts = await getQuestions(searchParams.q);
  return (
    <div className="py-2 px-4 min-h-[100vh]">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>
            Explore Recent Questions
          </CardTitle>
          <CardDescription>
            Dive into the latest discussions or browse by tags to find topics that interest you.
          </CardDescription>
        </CardHeader>
      </Card>
      <SearchContainer params={posts} />
    </div>
  )
}