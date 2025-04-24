'use server'

import { db } from "@/lib/db";
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