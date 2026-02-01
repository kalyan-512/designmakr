import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: { email: { label: "Email", type: "email", placeholder: "you@example.com" } },
      async authorize(credentials) {
        if (credentials?.email) {
          return { id: "1", email: credentials.email, name: credentials.email.split("@")[0] };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/auth/signin" },
  session: { strategy: "jwt" as const },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = (user as any).id;
        token.email = (user as any).email;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};
