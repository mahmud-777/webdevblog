// import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas/LoginSchemas"
import { getUserByEmail } from "./lib/user"
import bcryptjs from "bcryptjs"

 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",      
    }),
    Google({      
      // clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientId: process.env.GOOGLE_CLIENT_ID ,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      
    }),
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials)

        if(validateFields.success){
          const { email, password } = validateFields.data

          const user = await getUserByEmail(email)

          if(!user || !user.password) return null;

          const isCorrectPassword = await bcryptjs.compare(password, user.password)

          if(isCorrectPassword) return user;
        }
        
        return null
      }
    })
  ],
} satisfies NextAuthConfig