"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { upsertUser } from "@/lib/auth-utils";

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = await upsertUser({
    email: session.user.email,
    name: session.user.name,
    image: session.user.image,
  });

  return user;
}

export async function updateDemoCount(userId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      demoUsed: {
        increment: 1,
      },
    },
  });
}

export async function resetDemoCount(userId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      demoUsed: 0,
      lastDemoReset: new Date(),
    },
  });
}
