"use server";

import { prisma } from "./prisma";

export async function upsertUser(userData: {
  email: string;
  name?: string | null;
  image?: string | null;
}) {
  return prisma.user.upsert({
    where: { email: userData.email },
    update: {
      name: userData.name,
      image: userData.image,
      lastDemoReset: new Date(),
    },
    create: {
      email: userData.email,
      name: userData.name,
      image: userData.image,
      demoLimit: 5,
      demoUsed: 0,
      lastDemoReset: new Date(),
    },
  });
}
