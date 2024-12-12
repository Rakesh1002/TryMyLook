import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const LIMIT = 5;
const WINDOW = 15 * 24 * 60 * 60; // 15 days in seconds

export async function checkRateLimit(ip: string): Promise<{
  remaining: number;
  success: boolean;
  resetIn?: string;
  message?: string;
}> {
  const key = `rate-limit:tryon:${ip}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, WINDOW);
  }

  const ttl = await redis.ttl(key);
  const days = Math.ceil(ttl / (24 * 60 * 60));

  const isLimited = count > LIMIT;
  const message = isLimited
    ? "Trial limit reached. Please mail contact@trymylook.com to purchase a license or know more about our plans."
    : `${LIMIT - count} trials remaining`;

  return {
    remaining: Math.max(0, LIMIT - count),
    success: !isLimited,
    resetIn: `${days} days`,
    message,
  };
}
