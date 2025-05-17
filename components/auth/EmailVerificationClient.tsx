'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyEmail } from './../../actions/auth/email-verification';
import Heading from "../common/Heading";
import Alert from "../common/Alert";
import Button from "../common/Button";


const EmailVerificationClient = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [pending, setPending] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {

    setPending(true)
    if(!token){
      setError("Missing verification token!")
      return
    }
    verifyEmail(token).then(res => {      
        setSuccess(res.success)
        setError(res.error)      
    })
    setPending(false) ;
  },[token])

  return ( 
    <div  className="border-2 rounded-md p-2 flex flex-col items-center gap-2  my-8 max-w-[400px] mx-auto ">
      <Heading title="WEBDEV.blog" center />
      {/* <div className="flex flex-col items-center justify-center h-screen"> */}
        
        {pending && <div className="text-2xl font-bold">Verifying Email... </div> }
        {success && <Alert message={success} success  /> }
        {error && <Alert message={error} error /> }
        {success && <Button type="submit" label="Login" onClick={() => router.push("/login")} />}
        {/* {!pending && !success && !error && <p className="text-red-500">Something went wrong!</p>} */}


      {/* </div> */}

    </div>
   );
}
 
export default EmailVerificationClient;