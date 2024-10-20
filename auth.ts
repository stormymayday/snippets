import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/utils/user";

type ExtendedUser = DefaultSession["user"] & {
    // add extra fields here:
    // newCustomField: string;
    role: "ADMIN" | "USER";
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: "ADMIN" | "USER";
    }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    callbacks: {
        // async signIn({ user }) {
        //     if (!user.id) {
        //         return false;
        //     }

        //     const existingUser = await getUserById(user.id);

        //     if (!existingUser || !existingUser.emailVerified) {
        //         // Preventing Sign In if email is not verified
        //         return false;
        //     }

        //     return true;
        // },
        async session({ token, session }) {
            // Attaching User ID to the session
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            // Attaching User Role to the session
            if (token.role && session.user) {
                // session.user.role = token.role as UserRole;
                session.user.role = token.role;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) {
                return token;
            }

            // fetching user from the database
            const existingUser = await getUserById(token.sub);

            if (!existingUser) {
                return token;
            }

            // attaching role to the token
            token.role = existingUser.role;

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
