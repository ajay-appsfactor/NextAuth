import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/utils/hashPassword";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim();
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            user_key: true,
            email: true,
            password: true,
            role: true,
            first_name: true,
            last_name: true,
          },
        });

        if (!user) throw new Error("Invalid email or password");

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("Invalid email or password");

        // Return only necessary data
        return {
          id: user.user_key,
          email: user.email,
          role: user.role,
          first_name: user.first_name,
          last_name: user.last_name,
          name: `${user.first_name} ${user.last_name}`,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // On sign-in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
      }

      // On session update (e.g., after profile update)
      if (trigger === "update" && session) {
        token.first_name = session.first_name;
        token.last_name = session.last_name;
        if (session.email) token.email = session.email;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        role: token.role,
        first_name: token.first_name,
        last_name: token.last_name,
        name: `${token.first_name} ${token.last_name}`,
      };
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Session update frequency
  },

  secret: process.env.NEXTAUTH_SECRET,
};
