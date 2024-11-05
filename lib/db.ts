// @/lib/db.ts
import { PrismaClient } from "@prisma/client";

// Create a Prisma client instance as a singleton
declare global {
  // This prevents TypeScript from complaining about the `prisma` property on `globalThis`
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

// Assign the singleton Prisma client to `globalThis` in development mode
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;