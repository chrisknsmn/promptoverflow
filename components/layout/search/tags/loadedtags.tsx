import type { Tag, TagProps } from "@/types/tags";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function Tags({ tags }: TagProps) {

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
  
    // Group tags by type
  const groupedTags = tags.reduce(
    (acc: { [key: string]: Tag[] }, tag) => {
      const type = tag.type || "Other";
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(tag);
      return acc;
    },
    {}
  );
  
  
  return (
    <>
      <div className="space-y-4">
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
                  <Link
                    href={`/tags/${tag.name}`}
                    className="h-full"
                    key={tag.id}
                  >
                    <Card
                      className="hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full flex flex-col"
                    >
                      <CardHeader className="space-y-1 p-4">
                        <Badge
                          className="w-fit text-white"
                        >
                          {tag.postCount} posts
                        </Badge>
                        <CardTitle className="text-lg">{tag.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex-grow flex flex-col">
                        <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">
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
      </div>

      {/* {params.length === 0 && (
        <div className="flex flex-col gap-2 border-t first:border-t-0 p-4 hover:bg-accent cursor-pointer text-center text-muted-foreground">
          No posts found.
        </div>
      )} */}
    </>
  );
}
