
import { Button } from '@/components/ui/button'
import { FileIcon, Plus } from 'lucide-react'
import React from 'react'

const test = () => {
  return (
     <div  id ='test' className='w-1/3 bg-slate-300 h-screen flex items-center'>
       
       
       
        <div id='main' className='w-full bg-red-300 h-7 flex justify-between aling-items-center'>
            
            <div id='left' className='flex items-center py-2 rounded-md hover:bg-primary/5'>
                <Plus className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
            </div>

            <div id='right' className='flex items-center'>
            <FileIcon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
            </div>

        </div>

    </div>  
                                  // vs justify-center
    /* <div className='flex flex-row items-center justify-between h-screen space-x-4'>
        <div>
            hellow
        </div>
        <div>world</div>
    </div> */



    //smart trick.. to show if list is empty
    /* 
    <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-sm text-center text-muted-foreground">
            No notes available..
        </p>
    </div> */
  )
}

export default test