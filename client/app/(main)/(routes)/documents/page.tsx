"use client";
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Image  from 'next/image'
import React from 'react'
/* import session and get user */
import { useSession } from "@/context/sessionContext";



const documents = () => {

  const sessionContext = useSession();
  const session = sessionContext ? sessionContext.session : null

  return (

    <div className='flex flex-col items-center justify-center h-screen space-y-4'>
        <Image src = "/newNote.jpeg" height ="300" width="300" alt=''/>
        <Image src = "/newNoteDark.jpeg" height ="300" width="300" alt='' className='hidden dark:block'/>  
        <h2 className='text-lg font-bold'>Welcome {session ? session.user.name : 'Guest' } to your codeHUB</h2>
        <Button>
            Create New Note
            <PlusCircle className='h-6 w-6'/>
        </Button>
    </div>
  )
}

export default documents