import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";
import authConfig from "@/auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
    callbacks: {
        async session({ token, session }) {
            // console.log({ sessionToken: token, session });

            // Attaching User ID to the session
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            return session;
        },
        async jwt({ token }) {
            // console.log({ token });

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
