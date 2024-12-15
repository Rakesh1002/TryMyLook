"use server";

import { prisma } from "./prisma";
import { config } from "./config";

export async function upsertUser(userData: {
  email: string;
  name?: string | null;
  image?: string | null;
}) {
  // Cache key based on email
  const cacheKey = `user:${userData.email}`;

  // Try to get from cache first
  const cached = globalThis.__userCache?.get(cacheKey);
  if (cached) {
    return cached;
  }

  const user = await prisma.user.upsert({
    where: { email: userData.email },
    update: {
      name: userData.name,
      image: userData.image,
      demoLimit: config.demoLimit,
      lastDemoReset: new Date(),
    },
    create: {
      email: userData.email,
      name: userData.name,
      image: userData.image,
      demoLimit: config.demoLimit,
      demoUsed: 0,
      lastDemoReset: new Date(),
    },
  });

  // Initialize cache if needed
  if (!globalThis.__userCache) {
    globalThis.__userCache = new Map();
  }

  // Cache for 5 minutes
  globalThis.__userCache.set(cacheKey, user);
  setTimeout(() => {
    globalThis.__userCache?.delete(cacheKey);
  }, 5 * 60 * 1000);

  return user;
}
