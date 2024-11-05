import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type PostType = {
  id: string;
  title: string;
  content: string;
  author: {
    name?: string | null;
    username?: string | null;
    avatarUrl?: string | null;
  };
  voteCount: number;
  _count: {
    comments: number;
  };
  viewCount: number;
};

type PostsProps = {
  posts: PostType[];
};

export default function DisplayPosts({ posts }: PostsProps) {
  return (
    <div className="grid gap-6">
      {posts.map((post: any) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <Link href={`/posts/${post.id}`} className="hover:text-primary">
                <CardTitle>{post.title}</CardTitle>
              </Link>
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
  );
}
