import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { PrismaAdapter} from "@auth/prisma-adapter"
import { db } from "./lib/db"


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
  pages: {
    signIn: "/login",
  }
})