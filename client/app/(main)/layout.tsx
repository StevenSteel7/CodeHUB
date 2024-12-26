"use client";

// for authentication and theming

import { redirect } from "next/navigation";
import Navigation from "@/app/(main)/_components/navigation";
import {Toaster} from "sonner";
const mainLayout = ({children}: { children: React.ReactNode }) => {
 /* session */
 const session = 1;

 /* if loading spinner */

 // if not autheicated
if(!session){
    return  redirect('/');
    
}
    
return (
    <div className = "h-full flex dark:bg-[1F1F1F]">
        <Toaster position="bottom-right"/>
        <Navigation/>
        <main className="flex-1 h-full overflow-y-auto"> 
            {children}
        </main>
    </div>
  )
}

export default mainLayout