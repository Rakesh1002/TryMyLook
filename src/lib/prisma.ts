import { PrismaClient } from "@prisma/client";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    adapter: new PrismaNeon(
      new Pool({ connectionString: process.env.DATABASE_URL })
    ),
  });
} else {
  // In development, use a global variable to prevent multiple instances
  const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
  };

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      adapter: new PrismaNeon(
        new Pool({ connectionString: process.env.DATABASE_URL })
      ),
      log: ["query"],
    });
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };
