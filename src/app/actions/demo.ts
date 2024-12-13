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

export async function createDemo(inputImage: string): Promise<DemoResponse> {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("Not authenticated");
    }

    // Get current user
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Failed to get user record");
    }

    // Check rate limit before proceeding
    await checkAndUpdateRateLimit();

    // Create demo record and update user's demo count in a transaction
    const [demo, updatedUser] = await prisma.$transaction([
      prisma.demo.create({
        data: {
          userId: user.id,
          inputImage,
          outputImage: "", // Will be updated after processing
          status: "PENDING" as Status,
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: {
          demoUsed: {
            increment: 1,
          },
        },
      }),
    ]);

    return {
      success: true,
      demoId: demo.id,
      remainingTries: updatedUser.demoLimit - updatedUser.demoUsed,
    };
  } catch (error) {
    if (error instanceof RateLimitError) {
      return {
        success: false,
        error: error.message,
        isRateLimit: true,
      };
    }

    return {
      success: false,
      error: "Failed to create demo",
      isRateLimit: false,
    };
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
