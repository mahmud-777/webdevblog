import { z  } from "zod";
 

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be 4 characters or long" })
    .max(30, { message: "Name must be 30 characters or long" }),
  email: z.string().email(),
  password: z
    .string()    
    .min(6, {  message: "Password must be 6 or more characters long" }), 
  confirmPassword: z.string()  
}).refine(
  (values)=> {return values.password === values.confirmPassword},
  {
    message: "Passwords must match!",
    path: ["confirmPassword"],

  }
)

export type RegisterSchemaType  = z.infer<typeof RegisterSchema>;
