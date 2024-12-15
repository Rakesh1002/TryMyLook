import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { upsertUser } from "./lib/auth-utils";

export const runtime = "edge";

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
    async signIn({ user }) {
      if (!user.email) return false;
      await upsertUser({
        email: user.email,
        name: user.name,
        image: user.image,
      });
      return true;
    },
    async session({ session }) {
      if (session.user?.email) {
        const dbUser = await upsertUser({
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        });
        session.user.id = dbUser.id;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDemoPage = nextUrl.pathname.startsWith("/demo");

      if (isDemoPage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      return true;
    },
  },
});
