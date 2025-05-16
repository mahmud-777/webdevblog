import NextAuth, { type DefaultSession } from "next-auth"
import authConfig from "./auth.config"

import { PrismaAdapter} from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserByEmail } from "./lib/user"


declare module "next-auth"{
  interface Session {
    user:{
      role: "USER" | "ADMIN";
      userId: string;
    } & DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt"},
  ...authConfig,
  events: {
    async linkAccount({user}){
      await db.user.update({
        where: {id: user.id},
        data: { emailVerified: new Date()}
      });
    },
  },
  callbacks: {
    async jwt({token}){
      if(!token.email) return token

      const user = await getUserByEmail(token.email)

      if(!user) return token

      if(user){
        token.userId = user.id
        token.role = user.role
        // token.email = user.email
        // token.name = user.name
        // token.image = user.image
      }

      console.log("jwt token>>", token)
      return token
    },

    async session({session, token}){
      if(token.role){
        session.user.role = token.role as "USER" | "ADMIN"
      }

      if(token.userId){
        session.user.id = token.userId as string
      }

      console.log("session token >>>", token)
      return session;
    }
  },
  pages: {
    signIn: "/login",
  }
})