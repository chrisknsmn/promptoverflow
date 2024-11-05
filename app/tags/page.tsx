import prisma from "@/lib/db";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default async function Home() {
  
  const tags = await prisma.tag.findMany({
    orderBy: [
      {
        postCount: "desc",
      },
      {
        name: "asc",
      },
    ],
  });

  // Group tags by type
  const groupedTags = tags.reduce(
    (acc: { [key: string]: typeof tags }, tag) => {
      const type = tag.type || "Other";
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(tag);
      return acc;
    },
    {}
  );

  // Define type order for consistent display
  const typeOrder = [
    "model",
    "technique",
    "use-case",
    "framework",
    "concept",
    "task",
    "Other",
  ];

  return (
    <div className="space-y-4 p-2">
      {typeOrder.map((type) => {
        const tagsInType = groupedTags[type] || [];
        if (tagsInType.length === 0) return null;

        return (
          <div key={type}>
            <h2 className="text-2xl font-semibold capitalize mb-2">
              {type.replace("-", " ")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {tagsInType.map((tag) => (
                <Link href={`/tags/${tag.id}`}>
                  <Card
                    key={tag.id}
                    className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  >
                    <CardHeader className="space-y-1 p-4">
                      <Badge
                        className="w-fit text-white"
                        //   style={{
                        //     backgroundColor: tag.color || undefined,
                        //   }}
                      >
                        {tag.postCount} posts
                      </Badge>
                      <CardTitle className="text-lg">{tag.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tag.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{tag.followerCount} followers</span>
                        {tag.synonyms && tag.synonyms.length > 0 && (
                          <span className="text-xs text-muted-foreground/60">
                            Also known as: {tag.synonyms.join(", ")}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      <div className="pt-4">
        <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
          <CardHeader className="space-y-1 p-4 block">
            <CardTitle className="text-lg">View Recent Questions</CardTitle>
            <CardDescription className="text-lg">
              Click below to view trending questions and solutions
            </CardDescription>
            <Link href="/">
              <Button className="mt-4">Learn more</Button>
            </Link>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
