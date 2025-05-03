'use server'


import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/user";
import { LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchemas"
import { AuthError } from "next-auth";



export const login = async (values: LoginSchemaType) => {
  const validateFields = LoginSchema.safeParse(values);

  if(!validateFields.success){
    return { error: "Invalid fields", }
  }

  const { email, password } = validateFields.data;

  const user = await getUserByEmail(email);
  if(!user  || !email || !password || !user.password){
    return { error: "Invalid credentials!" }    
  }

  // if(!user.emailVerified){
  //   return { error: "Email not verified!" }    
  // }

  try {
    await signIn('credentials', {email, password, redirectTo: LOGIN_REDIRECT })

  } catch (error) {

    
    //***********************
    if(error instanceof AuthError){
      // if (error.message === "CredentialsSignin") {
      //   return { error: "Invalid credentials!" };
      // } else {
      //   return { error: "Something went wrong!" };
      // }
      switch (error.message) {
        case "CredentialsSignin":
          return {error: "Invalid credentials!"}  
        default:
          return {error: "Something went wrong!"}
      }
    }
    
  }
  
}