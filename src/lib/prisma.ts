import { PrismaClient } from "@prisma/client";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

/* eslint-disable no-var */
declare global {
  var prisma: PrismaClient | undefined;
  var pool: Pool | undefined;
}
/* eslint-enable no-var */

let prisma: PrismaClient;

if (!global.pool) {
  global.pool = new Pool({ connectionString: process.env.DATABASE_URL! });
}

if (process.env.NODE_ENV === "production") {
  const adapter = new PrismaNeon(global.pool);
  prisma = new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });
} else {
  if (!global.prisma) {
    const adapter = new PrismaNeon(global.pool);
    global.prisma = new PrismaClient({
      adapter,
      log: ["query", "error", "warn"],
    });
  }
  prisma = global.prisma;
}

export { prisma };
