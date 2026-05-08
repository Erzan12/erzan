import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma/prisma";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter, // keep if using GitHub OAuth
  session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // Credentials({
    //   name: "Credentials",
    //   credentials: { email: {}, password: {} },
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials?.password) return null;

    //     const user = await prisma.user.findUnique({
    //       where: { email: credentials.email },
    //     });

    //       if (!user?.password || !user.email) return null; // ← guard email null

    //     const valid = await bcrypt.compare(credentials.password, user.password);
    //     if (!valid) return null;

    //     return {
    //       id: user.id,
    //       email: user.email,        // now string, not string | null
    //       name: user.name ?? null,
    //       image: user.image ?? null,
    //       role: user.role,
    //     };
    //   },
    // }),
    Credentials({
      id: "guest-login",
      name: "Guest Login",

      credentials: {
        name: {},
        email: {},
      },

      async authorize(credentials) {
        const name = credentials?.name?.trim();
        const email = credentials?.email?.trim().toLowerCase();

        // validation
        if (!name || !email) {
          throw new Error("Name and email are required");
        }

        // basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
          throw new Error("Invalid email");
        }

        // check existing user
        let user = await prisma.user.findUnique({
          where: { email },
        });

        // create guest user if not existing
        if (!user) {
          user = await prisma.user.create({
            data: {
              name,
              email,
              role: "GUEST",
            },
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = user.image ?? null;
        token.role = user.role;
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
    async signIn({ user }) {
      return !!user.email; // allow any authenticated user
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};