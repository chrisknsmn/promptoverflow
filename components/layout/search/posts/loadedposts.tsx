import type { PostsProps, PostType } from "@/types/post";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Posts({ params }: PostsProps) {
  return (
    <>
      {params.map((post: PostType) => (
        <Link
          href={`/posts/${post.id}`}
          key={post.id}
          className="flex flex-col gap-2 border-t first:border-t-0 p-4 hover:bg-accent cursor-pointer"
        >
          <div className="flex flex-col">
            <div className="flex items-start justify-between">
              <p className="text-2xl font-semibold leading-none tracking-tight">
                {post.title}
              </p>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap mt-2 gap-2">
                {post.tags.map(({ tag }) => (
                  <Badge
                    key={tag.name}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex">
            <span className="text-sm text-muted-foreground">
              {post.author.name || post.author.username}
            </span>
          </div>
          <div className="flex text-sm text-muted-foreground gap-4">
            <span>{post.voteCount} votes</span>
            <span>{post._count.comments} comments</span>
            <span>{post.viewCount} views</span>
          </div>
        </Link>
      ))}
      {params.length === 0 && (
        <div className="flex flex-col gap-2 border-t first:border-t-0 p-4 hover:bg-accent cursor-pointer text-center text-muted-foreground">
          No posts found.
        </div>
      )}
    </>
  );
}
