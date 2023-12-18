import format from "date-fns/format";
import id from "date-fns/locale/id";
import { Awaitable, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import { env } from "~env.mjs";

const {
  NEXT_PUBLIC_GITHUB_ID,
  NEXT_PUBLIC_GITHUB_SECRET,
  NEXTAUTH_SECRET,
  CREDENTIAL_PASSWORD,
  CREDENTIAL_USERNAME,
} = env;

const createdAt = format(new Date(), "cccc, dd MMMM yyyy, k:m:s", {
  locale: id,
});

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      profile(profile: GithubProfile): Awaitable<User> {
        return {
          ...profile,
          id: profile.id.toString(),
          email: profile.email,
          name: profile.name,
          image: profile.avatar_url,
          login: profile.login,
        };
      },
      clientId: NEXT_PUBLIC_GITHUB_ID,
      clientSecret: NEXT_PUBLIC_GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials Login",
      credentials: {
        username: {
          label: "Username",
          type: "username",
          placeholder: "Username....",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password....",
        },
      },
      async authorize(credentials) {
        const user = {
          id: "12345678",
          name: CREDENTIAL_USERNAME,
          image: "",
          password: CREDENTIAL_PASSWORD,
          created_at: createdAt,
        };

        const creds = credentials as Record<"username" | "password", string>;

        if (creds.username === user.name && creds.password === user.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.login = user.login;
        token.created_at = user.created_at;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.login = token.login as string;
        session.user.created_at = token.created_at as string;
      }

      return session;
    },
  },
  theme: { colorScheme: "auto" },
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
};
