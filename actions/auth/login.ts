'use server'


import { signIn } from "@/auth";
import { generateEmailVerificationToken, sendEmailVerificationToken } from "@/lib/emailVerification";
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

  if(!user.emailVerified){
    const emailVerificationToken = await generateEmailVerificationToken(user.email)
  
    const {error } = await sendEmailVerificationToken(
      emailVerificationToken.email,
      emailVerificationToken.token
    );
    
    if(error){
      return{
        error: "Something went wrong while sending verification email! try to login to resend the verification email",
      };
    }

    return {success: "Verification email sent!"}
  }

  try {
    await signIn('credentials', {
      email,       
      password, 
      redirectTo: LOGIN_REDIRECT,
    })

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
      };
    }
    
  }
  
}