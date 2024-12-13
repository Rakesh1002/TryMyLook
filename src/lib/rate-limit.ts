import { prisma } from "./prisma";
import { auth } from "@/auth";

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitError";
  }
}

type RateLimitCheck = {
  id: string;
  demoLimit: number;
  demoUsed: number;
  lastDemoReset: Date;
};

export async function checkAndUpdateRateLimit(): Promise<boolean> {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const user = (await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      demoLimit: true,
      demoUsed: true,
      lastDemoReset: true,
    },
  })) as RateLimitCheck | null;

  if (!user) {
    throw new Error("User not found");
  }

  // Check if we need to reset the counter (e.g., if it's been 24 hours)
  const now = new Date();
  const resetTime = new Date(user.lastDemoReset);
  const hoursSinceReset =
    (now.getTime() - resetTime.getTime()) / (1000 * 60 * 60);

  if (hoursSinceReset >= 24) {
    // Reset the counter
    await prisma.user.update({
      where: { id: user.id },
      data: {
        demoUsed: 0,
        lastDemoReset: now,
      },
    });
    return true;
  }

  // Check if user has reached their limit
  if (user.demoUsed >= user.demoLimit) {
    const hoursUntilReset = 24 - hoursSinceReset;
    throw new RateLimitError(
      `Demo limit reached. Please try again in ${Math.ceil(
        hoursUntilReset
      )} hours.`
    );
  }

  return true;
}
