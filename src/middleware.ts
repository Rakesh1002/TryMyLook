import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isAuthenticated = !!req.auth;
  
  // Add your protected routes here
  const protectedPaths = ["/admin", "/dashboard", "/api/protected"];
  const isProtectedPath = protectedPaths.some((path) => 
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
});

// Optionally configure matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
