import { prisma } from "./prisma";
import { auth } from "@/auth";
import { config } from "./config";

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

  // Check if we need to reset the counter (e.g., if it's been 30 days)
  const now = new Date();
  const resetTime = new Date(user.lastDemoReset);
  const daysSinceReset =
    (now.getTime() - resetTime.getTime()) / (1000 * 60 * 60 * 24);

  if (daysSinceReset >= config.demoResetDays) {
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
    const daysUntilReset = config.demoResetDays - daysSinceReset;
    throw new RateLimitError(
      `Demo limit reached. Please try again in ${Math.ceil(
        daysUntilReset
      )} days.`
    );
  }

  return true;
}
