import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// Create a new ratelimiter, that allows 5 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"),
  analytics: true,
  enableProtection: true,
});
