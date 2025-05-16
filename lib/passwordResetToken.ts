import { db } from "./db"
import { v4 as uuidv4 } from "uuid"
import { Resend } from "resend"

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: {email}
    })

    return passwordResetToken
  } catch (error) {
    console.log(error)
    return null;    
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: {token},
    });

    return passwordResetToken
  } catch (error) {
    console.log(error)
    return null;    
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const exitingToken = await getPasswordResetTokenByEmail(email)

  if(exitingToken){
    await db.emailVerificationToken.delete({
      where: {id: exitingToken.id }
    })
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {email, token, expires}
  });

  return passwordResetToken;
};

//  http://localhost:3000/email-verification=8531aaf2-b3a9-4038-b721-776430c2729e
// export const sendEmailVerificationToken = async (email: string, token: string) => {
//   const resend = new Resend(process.env.RESEND_API_KEY as string)  
//   const emailVerificationLink = `${process.env.NEXTAUTH_URL}/email-verification?token=${token}`

//   const res = await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: email,
//     subject: "Verify your email",
//     html: `<p>Click <a href="${emailVerificationLink}">here</a> to verify your email.</p>`,
//   });

//   return {error: res.error}
// }

export const sendPasswordResetEmail = async (
  email: string,  
  token: string
) => {
  const resend = new Resend(process.env.RESEND_API_KEY as string)  
  const resetLink = `${process.env.NEXTAUTH_URL}/password-reset-form?token=${token}`

  const res = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Password reset link",
    html: `<p>Click <a href="${resetLink}">here</a> to reset  your password.</p>`,
  });

  return {error: res.error}
}