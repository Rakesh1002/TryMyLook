import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRateLimit } from "./lib/rate-limiter";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/api/try-on") {
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const {
      success,
      remaining,
      resetIn = "15 days",
      message,
    } = await checkRateLimit(ip.split(",")[0]);

    if (!success) {
      return new NextResponse(
        JSON.stringify({
          error: message,
          remaining: 0,
          resetIn,
          contactSales: true,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": resetIn,
          } as HeadersInit,
        }
      );
    }

    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    response.headers.set("X-RateLimit-Message", message || "");
    if (resetIn) {
      response.headers.set("X-RateLimit-Reset", resetIn);
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/try-on",
};
