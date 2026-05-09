import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma/prisma";
import type { NextAuthOptions } from "next-auth";
import { UserRole } from "@prisma/client";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt" },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: { params: { scope: "read:user user:email" } },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      id: "guest-login",
      name: "Guest Login",
      credentials: { name: {}, email: {} },
      async authorize(credentials) {
        const name = credentials?.name?.trim();
        const email = credentials?.email?.trim().toLowerCase();
        if (!name || !email) throw new Error("Name and email are required");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) throw new Error("Invalid email");

        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          user = await prisma.user.create({
            data: { name, email, role: UserRole.GUEST },
          });
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
  pages: { signIn: "/login" },

  events: {
    async createUser({ user }) {
      if (!user.email) return;
      const isAdmin = user.email === process.env.ADMIN_EMAIL;
      await prisma.user.update({
        where: { email: user.email },
        data: { role: isAdmin ? UserRole.ADMINISTRATOR : UserRole.GUEST },
      });
    },
    async signIn({ user }) {
      if (!user.email) return;
      const isAdmin = user.email === process.env.ADMIN_EMAIL;
      await prisma.user.update({
        where: { email: user.email },
        data: { role: isAdmin ? UserRole.ADMINISTRATOR : UserRole.GUEST },
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;
      if (!account || account.provider === "credentials") return true;

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: { accounts: true },
      });

      if (!existingUser) return true;

      const alreadyLinked = existingUser.accounts.some(
        (acc) =>
          acc.provider === account.provider &&
          acc.providerAccountId === account.providerAccountId
      );

      if (alreadyLinked) return true;

      // 🔗 Auto-link new provider to existing user
      await prisma.account.create({
        data: {
          userId: existingUser.id,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refresh_token: account.refresh_token ?? null,
          access_token: account.access_token ?? null,
          expires_at: account.expires_at ?? null,
          token_type: account.token_type ?? null,
          scope: account.scope ?? null,
          id_token: account.id_token ?? null,
          session_state: (account.session_state as string) ?? null,
        },
      });

      // Tell NextAuth to use existing user instead of creating a new one
      user.id = existingUser.id;

      return true;
    },

    async jwt({ token, user }) {
      const email = user?.email ?? (token.email as string | undefined);
      if (email) {
        const dbUser = await prisma.user.findUnique({ where: { email } });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.image = dbUser.image;
          token.email = dbUser.email;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        session.user.role = token.role;
        session.user.image = token.image as string | null | undefined;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};