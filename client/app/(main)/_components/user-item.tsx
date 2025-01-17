"use client";


import { authClient } from "@/auth-client";
import LoadingButton from "@/components/loading-button";
 import {Avatar, AvatarImage} from "@/components/ui/avatar"; 
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem ,
         DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { useSession } from "@/context/sessionContext";
import { ChevronsLeftRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";



const UserItem = () => {

const sessionContext = useSession();
const session = sessionContext ? sessionContext.session : null;

const [pending, setPending] = useState(false);
const router = useRouter();
	


    const handleSignOut = async () => {
        try {
            setPending(true);
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {                        
                        router.refresh(); // Clear cached data
                        router.push("/");   
                    },
                },
            });
        } catch (error) {
            console.error("Error signing out:", error);
        } finally {
            setPending(false);
        }
    };
    
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <div role="button" className="flex items-center text-sm p-3 w-full
             hover:bg-primary/5  this means opacity is 5"> 
                <div className="gap-x-2 flex items-center max-w-[150px]">
                    <Avatar>
                        <AvatarImage src="https://avatars.dicebear.com/api/avataaars/john-doe.svg" />
                    </Avatar>                               
                    
                                                {/* name from backend   line-clamp truncated line if toooo looong*/}
                    <span className="text-start frornt-medium line-clamp-1">{session.user.name}</span>       
                </div>
                <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
            <div className="flex flex-col space-y-4">
                <p className=" text-base font-medium leading-none text-muted-foreground">
                    {session.user.email} 
                </p>
            <div className=" flex items-center gap-x-2">
                <div className="rounded-md bg-secondary p-1">
                    <Avatar>
                        <AvatarImage src="https://avatars.dicebear.com/api/avataaars/john-doe.svg" />
                    </Avatar>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium line-clamp-1">{session? session.user.name : 'Guest'}</p>
                        <p className="text-xs text-muted-foreground"></p>
                    </div>
                </div>
            </div>
            <DropdownMenuSeparator/>
            <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground">
               <LoadingButton pending={pending} onClick={handleSignOut}>
                        Sign Out
                </LoadingButton>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserItem