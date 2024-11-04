import prisma from "@/lib/db";

export type SearchResults = {
  posts: Array<{
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    viewCount: number;
    voteCount: number;
    author: {
      name: string | null;
      username: string | null;
      avatarUrl: string | null;
    };
    tags: {
      tag: {
        id: string;
        name: string;
        color: string;
      };
    }[];
    _count: {
      comments: number;
    };
  }>;
  tags: Array<{
    id: string;
    name: string;
    color: string | null;
    description: string | null;
    postCount: number;
  }>;
  totalResults: number;
};

export async function globalSearch(
  query: string,
  {
    page = 1,
    limit = 10,
    includeContent = true,
    types = ["posts", "tags"],
  }: {
    page?: number;
    limit?: number;
    includeContent?: boolean;
    types?: Array<"posts" | "tags">;
  } = {}
): Promise<SearchResults> {
  const searchQuery = query.trim().toLowerCase();
  const offset = (page - 1) * limit;

  const searchPromises: Promise<any>[] = [];
  const results: Partial<SearchResults> = {
    posts: [],
    tags: [],
    totalResults: 0,
  };

  if (types.includes("posts")) {
    searchPromises.push(
      prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" } },
            includeContent
              ? { content: { contains: searchQuery, mode: "insensitive" } }
              : {},
            {
              tags: {
                some: {
                  tag: {
                    OR: [
                      { name: { contains: searchQuery, mode: "insensitive" } },
                      {
                        description: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              author: {
                OR: [
                  { name: { contains: searchQuery, mode: "insensitive" } },
                  { username: { contains: searchQuery, mode: "insensitive" } },
                ],
              },
            },
          ],
        },
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
                  id: true,
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
        orderBy: [{ voteCount: "desc" }, { createdAt: "desc" }],
        skip: offset,
        take: limit,
      })
    );
  }

  if (types.includes("tags")) {
    searchPromises.push(
      prisma.tag.findMany({
        where: {
          OR: [
            { name: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
            { synonyms: { has: searchQuery } },
          ],
        },
        select: {
          id: true,
          name: true,
          color: true,
          description: true,
          postCount: true,
        },
        orderBy: {
          postCount: "desc",
        },
        skip: offset,
        take: limit,
      })
    );
  }

  // Get count of total results
  const countPromises = types.map((type) => {
    if (type === "posts") {
      return prisma.post.count({
        where: {
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" } },
            includeContent
              ? { content: { contains: searchQuery, mode: "insensitive" } }
              : {},
            {
              tags: {
                some: {
                  tag: {
                    OR: [
                      { name: { contains: searchQuery, mode: "insensitive" } },
                      {
                        description: {
                          contains: searchQuery,
                          mode: "insensitive",
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      });
    }
    return prisma.tag.count({
      where: {
        OR: [
          { name: { contains: searchQuery, mode: "insensitive" } },
          { description: { contains: searchQuery, mode: "insensitive" } },
          { synonyms: { has: searchQuery } },
        ],
      },
    });
  });

  const [searchResults, counts] = await Promise.all([
    Promise.all(searchPromises),
    Promise.all(countPromises),
  ]);

  if (types.includes("posts")) {
    results.posts = searchResults[types.indexOf("posts")];
  }
  if (types.includes("tags")) {
    results.tags = searchResults[types.indexOf("tags")];
  }

  results.totalResults = counts.reduce((acc, count) => acc + count, 0);

  return results as SearchResults;
}
