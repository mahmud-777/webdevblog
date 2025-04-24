'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import {  zodResolver} from  "@hookform/resolvers/zod"; 
import { LoginSchema, loginSchemaType } from "@/schemas/LoginSchemas";
import FormField from "../common/FormField";
import Button from "../common/Button";
import Heading from "../common/Heading";
import SocialAuth from "./SocialAuth";

const LoginForm = () => {
  const {  register,  handleSubmit, formState: { errors } } = useForm<loginSchemaType>({resolver: zodResolver(LoginSchema
  )});

  const onSubmit: SubmitHandler<loginSchemaType> =  (data)  => {
    console.log('data>>>', data)
  }


  return ( 
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-[500px] m-auto mt-8 gap-2" >
      <Heading title="Login to WEBDEV.blog" lg center />
      <FormField 
        id="email"
        register={register}
        errors={errors}
        placeholder="email"
      />
      <FormField 
        id="password"
        register={register}
        errors={errors}
        placeholder="password"
        type="password"
      />
      <Button type="submit" label="Login" outline />
      <div className="flex justify-center my-2">Or</div>
      <SocialAuth />  

    </form>

   );
}
 
export default LoginForm;