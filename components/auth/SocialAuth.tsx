import { FaGithub, FaGoogle } from "react-icons/fa";
import Button from "../common/Button";


const SocialAuth = () => {
  return ( 
    <div className="flex flex-col gap-2 md:flex-row">
      <Button type="button" label="Continue with Google" outline icon={FaGoogle } onClick={() => {}}  />
      <Button type="button" label="Continue with Github" outline icon={FaGithub } onClick={() => {}}  />
      

    </div>
   );
}
 
export default SocialAuth;