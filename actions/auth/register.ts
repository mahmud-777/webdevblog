'use server'

import { db } from "@/lib/db";
import { generateEmailVerificationToken, sendEmailVerificationToken } from "@/lib/emailVerification";
import { getUserByEmail } from "@/lib/user";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/RegisterSchema"
import  bcrypt  from 'bcryptjs';


export const signUp = async (values: RegisterSchemaType) => {
  const validateFields = RegisterSchema.safeParse(values);

  if(!validateFields.success){
    return { error: "Invalid fields", }
  }

  const { name, email, password } = validateFields.data;

  const user = await getUserByEmail(email);
  if(user){
    return { error: "Email already in use!" }
  }
  // hash password
  const hashPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashPassword
    }
  });

  return {success: "User created successfully!"}
}

export const verifyEmail = async (email: string) => {
  const user = await getUserByEmail(email);
  if(!user){
    return { error: "User not found!" }
  }

  await db.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date() }
  });

  const emailVerificationToken = await generateEmailVerificationToken(email)
  
  const { error } = await sendEmailVerificationToken(emailVerificationToken.email, emailVerificationToken.token)
  if(error){
    return { 
      error: "Something went wrong while sending verification email! Try to login to resend the verification email.", 
    }
  }
  return { success: "Verification email sent!" }
}
export const verifyToken = async (token: string) => {
  const verificationToken = await db.emailVerificationToken.findFirst({
    where: { token },
  });

  if (!verificationToken) {
    return { error: "Invalid token!" };
  }

  if (verificationToken.expires < new Date()) {
    return { error: "Token expired!" };
  }

  return { success: "Token verified successfully!" };
}