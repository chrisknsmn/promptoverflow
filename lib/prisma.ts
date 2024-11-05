import prisma from "@/lib/db";

export async function getPosts(query?: string) {
  return await prisma.post.findMany({
    take: 20, // Limit to 20 posts
    where: query ? {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          content: {
            contains: query,
            mode: 'insensitive'
          }
        }
      ]
    } : undefined,
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
}

async function getTags(query?: string) {
  return await prisma.tag.findMany({
    take: 20,
    where: query ? {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          synonyms: {
            hasSome: [query]
          }
        }
      ]
    } : undefined,
    include: {
      _count: {
        select: {
          posts: true,
          followers: true,
        },
      },
    },
    orderBy: [
      {
        postCount: 'desc',
      },
      {
        name: 'asc',
      },
    ],
  })
}

async function getUsers(query?: string) {
  return await prisma.user.findMany({
    take: 20,
    where: query ? {
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          username: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          email: {
            contains: query,
            mode: 'insensitive'
          }
        }
      ]
    } : undefined,
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      avatarUrl: true,
      bio: true,
      reputation: true,
      _count: {
        select: {
          posts: true,
          comments: true,
          tagFollows: true
        }
      }
    },
    orderBy: [
      {
        reputation: 'desc'
      },
      {
        name: 'asc'
      }
    ]
  })
}