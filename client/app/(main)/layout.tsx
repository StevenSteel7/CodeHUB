"use client";

// for authentication and theming
import { auth } from "@/auth";

import { redirect } from "next/navigation";
import Navigation from "@/app/(main)/_components/navigation";
import {Toaster} from "sonner";

import { useSession } from "@/context/sessionContext";


const mainLayout = ({children}: { children: React.ReactNode }) => {

const sessionContext = useSession();
const session = sessionContext ? sessionContext.session : null
    



 // if not autheicated

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