import prisma from "@/lib/db";

// Clerk
export async function initUser(user: any) {
    let userData = await getUser(user);
    if (userData == null) {
        await prisma.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: user.firstName + " " + user.lastName,
            },
        });
        userData = await getUser(user);
    }
    return userData;
}

export async function getUser(user: any) {
    let userData = await prisma.user.findUnique({
        where: {
            email: user.emailAddresses[0].emailAddress,
        },
        select: {
            id: true,
            email: true,
            name: true,
        },
    });
    return userData;
}


// General Search
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

// This was created for the questions page. 
// It is generally aimed at getting posts with few comments. 
// Intended to prioritize unanswered posts. 
export async function getQuestions(query?: string) {
  return await prisma.post.findMany({
    take: 20,
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
    orderBy: [
      {
        comments: {
          _count: 'asc', // Posts with fewer comments first
        },
      },
      {
        createdAt: 'desc', // Then by most recent
      }
    ],
  });
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