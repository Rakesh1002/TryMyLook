import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get auth cookie
  const authCookie = request.cookies.get("next-auth.session-token")?.value;
  
  // Protected paths
  const protectedPaths = ["/demo", "/admin", "/dashboard"];
  const isProtectedPath = protectedPaths.some((path) => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !authCookie) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// Optimize matcher to reduce bundle size
export const config = {
  matcher: [
    "/demo/:path*",
    "/admin/:path*",
    "/dashboard/:path*",
  ],
};
