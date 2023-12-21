import format from "date-fns/format";
import id from "date-fns/locale/id";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { Awaitable, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import { env } from "~env.mjs";
import { getUserAccount } from "~features/new-account";

const { NEXT_PUBLIC_GITHUB_ID, NEXT_PUBLIC_GITHUB_SECRET, NEXTAUTH_SECRET } =
  env;

const created_at = format(new Date(), "cccc, dd MMMM yyyy, k:m:s", {
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
        name: {
          label: "Username",
          type: "name",
          placeholder: "Username....",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password....",
        },
      },
      async authorize(credentials) {
        const creds = credentials as Record<"name" | "password", string>;

        const response = (await getUserAccount(
          creds.name,
          creds.password
        )) as QuerySnapshot<DocumentData, DocumentData>;

        const userAccount = response.docs.map((item) =>
          item.data()
        )[0] as Record<
          "created_at" | "email" | "image" | "name" | "password",
          string
        >;

        if (
          creds.name === userAccount.name &&
          creds.password === userAccount.password
        ) {
          return userAccount;
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
        session.user.email = token.email as string;
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
