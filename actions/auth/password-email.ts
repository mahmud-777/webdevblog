'use server'

import { generatePasswordResetToken, sendPasswordResetEmail } from "@/lib/passwordResetToken";
import { getUserByEmail } from "@/lib/user";
import { PasswordEmailSchema, PasswordEmailSchemaType } from "@/schemas/PasswordEmailSchema";
export const passwordEmail = async (values: PasswordEmailSchemaType ) => {
  const validateFields = PasswordEmailSchema.safeParse(values)
  if(!validateFields.success) {
    return { error: "Invalid email" }
  }

  const { email } = validateFields.data
  const user = await getUserByEmail(email)

  if(!user || !user.email) {
    return { error: "User not found!" }
  }

  const passwordResetToken = await generatePasswordResetToken(email)

  const {error } = await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)
  if(error) {
    return { error: "Something went wrong while sending password reset email!" }

  }
  return { success: "Password reset link was sent to your email!" }

}