'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import {  zodResolver} from  "@hookform/resolvers/zod"; 
import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchemas";
import FormField from "../common/FormField";
import Button from "../common/Button";
import Heading from "../common/Heading";
import SocialAuth from "./SocialAuth";
import { useState, useTransition } from "react";
import { login } from "@/actions/auth/login";
import Alert from "../common/Alert";
import { useRouter, useSearchParams } from "next/navigation";
import { LOGIN_REDIRECT } from "@/routes";

const LoginForm = () => {
  const searchParams = useSearchParams()
  const  [isPending, startTransition]  = useTransition();
  const [ error, setError] = useState<string | undefined>("");
  const {  register,  handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({resolver: zodResolver(LoginSchema )});

  const router = useRouter()

  const urlError = searchParams?.get('error') === "OAuthAccountNotLinked" ? "Email in used with different provider " : ""
  
    
  const onSubmit: SubmitHandler<LoginSchemaType> =  (data)  => {
    // console.log('data>>>', data)
    setError("")
    startTransition(() => {
      login(data).then((res) => {
        if(res?.error){
          router.replace('/login')
          setError(res.error)
        }

        if(!res?.error){
          // console.log('res>>>', res)
           router.push(LOGIN_REDIRECT)
        }
      })
    })
    
  }


  return ( 
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-[500px] m-auto mt-8 gap-2" >
      <Heading title="Login to WEBDEV.blog" lg center />
      <FormField 
        id="email"
        register={register}
        errors={errors}
        placeholder="email"
        disabled={isPending}
      />
      <FormField 
        id="password"
        register={register}
        errors={errors}
        placeholder="password"
        type="password"
        disabled={isPending}
      />
      {error && <Alert message={error} error />}

      <Button type="submit" label={isPending ? "Submitting ..." : "Login"} outline disabled={isPending} />
      <div className="flex justify-center my-2">Or</div>
      {urlError && <Alert message={urlError} error />}
      <SocialAuth />  

    </form>

   );
}
 
export default LoginForm;