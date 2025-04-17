
import { Search } from "lucide-react";
import { Input } from "../ui/input";

const SearchInput = () => {
  return ( 
    <div className="relative hidden sm:block">
      <Search className="absolute left-4 top-3  h-4 w-4 text-muted-foreground"  />
      <Input placeholder="Search" className="pl-10 bg-primary/10" />

    </div>
   );
}
 
export default SearchInput;