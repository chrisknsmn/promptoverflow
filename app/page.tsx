import prisma from "@/lib/db"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

async function getPosts() {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          username: true,
          avatarUrl: true,
        },
      },
      tags: {
        select: {
          tag: {
            select: {
              name: true,
              color: true,
            },
          },
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return posts
}

export default async function Home() {
  const posts = await getPosts()
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <Link href={`/posts/${post.id}`} className="hover:text-primary">
                  <CardTitle>{post.title}</CardTitle>
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {post.tags.map(({ tag }) => (
                  <Badge
                    key={tag.name}
                    style={{
                      backgroundColor: tag.color || undefined,
                      color: '#FFFFFF'
                    }}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                {post.content}
              </p>
            </CardContent>

            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-2">
                {post.author.avatarUrl && (
                  <img 
                    src={post.author.avatarUrl}
                    alt={post.author.name || ""}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="text-sm text-muted-foreground">
                  {post.author.name || post.author.username}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{post.voteCount} votes</span>
                <span>{post._count.comments} comments</span>
                <span>{post.viewCount} views</span>
              </div>
            </CardFooter>
          </Card>
        ))}

        {posts.length === 0 && (
          <p className="text-center text-muted-foreground">No posts found.</p>
        )}
      </div>
    </div>
  )
}