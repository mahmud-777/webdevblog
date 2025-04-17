'use client'
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  console.log('theme>>>', theme)
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  return ( 
    // <button onClick={toggleTheme}>
    //   <Sun className="hidden dark:block"/>
    //   <Moon className="block dark:hidden" />
    // </button>
    <Button onClick={toggleTheme} variant={"ghost"} >
      {/* {theme === "dark" ? <Sun className="hidden dark:block"/> : <Moon className="block dark:hidden" />} */}
      <Sun className="hidden dark:block" cursor={"pointer"} />
      <Moon className="block dark:hidden"  />
      
    </Button>
   );
}
 
export default ThemeToggle;