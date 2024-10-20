import NextAuth, { NextAuthOptions } from 'next-auth';
import  GitHubProvider  from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from '../../../../../lib/mongodb';
export const authOptions:NextAuthOptions = ({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter:MongoDBAdapter(clientPromise),
  session:{
    strategy:"jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.sub|| user.id || '';
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; 
      }
      return token;
    },
  },
});
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
