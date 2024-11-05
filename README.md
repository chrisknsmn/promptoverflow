# Prompt Overflow

A forum for prompt engineers. Built with Next.js, TypeScript, React, Shadcn UI, Radix UI, Tailwind CSS.

## Features
- **UI**: Tailwind CSS, Shadcn UI, Radix UI
- **Authentication**: Clerk
- **Database**: Supabase, Prisma

## Getting Started
Clone the repository and install dependencies:

```bash
git clone https://github.com/chrisknsmn/next-template.git
cd next-template
npm install
```

### Prisma Setup
Install Prisma and the Prisma client:

Initialize Prisma:

```bash
npx prisma init
```

Set the following environment variables in your `.env` file:

```env
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_url
```

Refer to the [Prisma Integration with Supabase](https://www.prisma.io/docs/guides/database/integrations/with-supabase) for more information.

### Updating the Schema
Run the initial migration after updating your schema:

```bash
npx prisma migrate dev --name init
```

### Database Schema

```mermaid
erDiagram
    User {
        uuid id PK
        string clerkId UK
        string email UK
        string name
        string username UK
        string bio
        string avatarUrl
        datetime createdAt
        datetime updatedAt
        int reputation
    }
    
    Friendship {
        uuid id PK
        uuid requesterId FK
        uuid addresseeId FK
        enum status
        datetime createdAt
        datetime updatedAt
    }

    SavedPost {
        uuid id PK
        uuid userId FK
        uuid postId FK
        datetime createdAt
        string notes
    }

    UserBlock {
        uuid id PK
        uuid blockerId FK
        uuid blockedId FK
        datetime createdAt
        string reason
    }
    
    Post {
        uuid id PK
        string title
        string content
        boolean published
        datetime createdAt
        datetime updatedAt
        int viewCount
        int voteCount
        uuid authorId FK
    }
    
    Comment {
        uuid id PK
        string content
        datetime createdAt
        datetime updatedAt
        int voteCount
        uuid authorId FK
        uuid postId FK
        uuid parentId FK
    }
    
    Tag {
        uuid id PK
        string name UK
        string description
        datetime createdAt
        int postCount
        int followerCount
        string color
        string icon
        string type
        string version
        string[] synonyms
        uuid parentId FK
    }

    PostTag {
        uuid postId PK,FK
        uuid tagId PK,FK
        datetime createdAt
    }

    TagFollow {
        uuid userId PK,FK
        uuid tagId PK,FK
        datetime createdAt
    }

    Vote {
        uuid id PK
        int value
        datetime createdAt
        uuid userId FK
        uuid postId FK
        uuid commentId FK
    }
    
    User ||--o{ Post : "creates"
    User ||--o{ Comment : "writes"
    User ||--o{ Vote : "makes"
    User ||--o{ TagFollow : "follows"
    User ||--o{ SavedPost : "saves"
    User ||--o{ Friendship : "requests"
    User ||--o{ Friendship : "receives"
    User ||--o{ UserBlock : "blocks"
    User ||--o{ UserBlock : "blocked by"
    
    Post ||--o{ Comment : "has"
    Post ||--o{ Vote : "receives"
    Post ||--o{ PostTag : "has"
    Post ||--o{ SavedPost : "saved in"
    
    Comment ||--o{ Comment : "has replies"
    Comment ||--o{ Vote : "receives"
    
    Tag ||--o{ PostTag : "tagged in"
    Tag ||--o{ TagFollow : "followed by"
    Tag ||--o{ Tag : "has children"
```

## Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clerk Documentation](https://clerk.dev/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Shadcn UI Documentation](https://shadcn.dev/docs)

## License
This project is licensed under the MIT License.
