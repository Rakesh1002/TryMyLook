import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

if (!process.env.AUTH_SECRET) {
  throw new Error("AUTH_SECRET is not defined");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    // This callback controls whether a user is allowed to access a protected route
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = ["/demo"].some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtectedRoute) return isLoggedIn;
      return true;
    },
    async signIn({ user, account }) {
      if (!user.email) return false;

      // Only upsert user on OAuth sign in
      if (account?.type === "oauth") {
        try {
          await fetch(`${process.env.NEXTAUTH_URL}/api/auth/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              image: user.image,
            }),
          });
        } catch (error) {
          console.error("Failed to upsert user:", error);
          // Continue sign in even if upsert fails
        }
      }

      return true;
    },
    async session({ session }) {
      return session;
    },
  },
});
