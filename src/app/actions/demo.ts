"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { checkAndUpdateRateLimit, RateLimitError } from "@/lib/rate-limit";
import type { Status } from "@prisma/client";
import { getCurrentUser } from "./user";

type DemoResponse = {
  success: boolean;
  demoId?: string;
  remainingTries?: number;
  error?: string;
  isRateLimit?: boolean;
};

export async function createDemo(): Promise<DemoResponse> {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "Not authenticated" };
    }

    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Check rate limit
    try {
      await checkAndUpdateRateLimit();
    } catch (error) {
      if (error instanceof RateLimitError) {
        return {
          success: false,
          error: error.message,
          isRateLimit: true,
          remainingTries: 0,
        };
      }
      throw error;
    }

    // Create demo record and increment usage in a transaction
    const [demo, updatedUser] = await prisma.$transaction([
      prisma.demo.create({
        data: {
          userId: user.id,
          inputImage: "",
          outputImage: "",
          status: "PENDING",
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { demoUsed: { increment: 1 } },
        select: { demoLimit: true, demoUsed: true },
      }),
    ]);

    return {
      success: true,
      demoId: demo.id,
      remainingTries: Math.max(0, updatedUser.demoLimit - updatedUser.demoUsed),
    };
  } catch (error) {
    console.error("Failed to create demo:", error);
    return { success: false, error: "Failed to create demo record" };
  }
}

export async function updateDemoStatus(
  demoId: string,
  status: Status,
  outputImage?: string
) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  return prisma.demo.update({
    where: { id: demoId },
    data: {
      status,
      ...(outputImage ? { outputImage } : {}),
    },
  });
}
