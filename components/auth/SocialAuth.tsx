import { FaGithub, FaGoogle } from "react-icons/fa";
import Button from "../common/Button";
import { signIn } from "next-auth/react";
import { LOGIN_REDIRECT } from "@/routes";


const SocialAuth = () => {
  const handleOnClick = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: LOGIN_REDIRECT
    })
  }
  return ( 
    <div className="flex flex-col gap-2 md:flex-row">
      <Button type="button" label="Continue with Google" outline icon={FaGoogle } 
        onClick={() => handleOnClick("google")}
      />
      <Button type="button" label="Continue with Github" outline icon={FaGithub } 
        onClick={() => handleOnClick("github")}
      />
      

    </div>
   );
}
 
export default SocialAuth;