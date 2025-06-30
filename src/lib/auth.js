import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/utils/hashPassword";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) throw new Error("No user found");

          const isValid = await verifyPassword(password, user.password);
          if (!isValid) throw new Error("Invalid password");

          // Return minimal user object
          return {
            id: user.user_key,
            email: user.email,
            role: user.role,
            name: `${user.first_name} ${user.last_name}`,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
