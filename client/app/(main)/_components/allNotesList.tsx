'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileIcon, LucideIcon, Minus, MoreHorizontal, Plus, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DropdownMenu, 
          DropdownMenuSeparator, 
          DropdownMenuTrigger, 
          DropdownMenuContent,
          DropdownMenuItem} from '@/components/ui/dropdown-menu';

import softDelete from "./softDelete";




interface ItemProps{
  id? : string; // only will have id if its a note
  documentIcon? : string;
  session : any;
  notes : any;
  setnotes : any;
  loading? : boolean;
  active? : boolean;
  expanded? : boolean;
  isSearch? : boolean;
  level? : number;
  onExpand?: () => void;
  label?  : string;
  onClick? : () => void;

};



const AllNotesList = ({ session  ,notes ,setnotes ,loading}: ItemProps ) => {  
  let active = true;

  return (
    <div>
      {notes.length > 0 && (     // only if notes are not archived
      notes.map((note: any) => ( note.isArchived == false &&(
        
        console.log(note),
        <div key={note._id} className="note-item">
        <div  
          role="button"
          className={cn(
          "group min-h-[27px] text-sm py-1 pl-3 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
          note.active && "bg-primary/5 text-primary"
          )}
        >
        
          <FileIcon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
          
          <span className="truncate">{note?.title}</span>
          
          
          <div className='ml-auto flex items-center gap-x-2'> 
              <DropdownMenu>
                <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
                  <div
                    role="button"
                    className="ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600"
                  >
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-60" align="start" side="right" forceMount>
              
                    <DropdownMenuItem onClick={() => softDelete(note._id, session,notes,setnotes)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <div className="p-2 text-xs text-muted-foreground">
                    Last modified on : {new Date(note.updatedAt).toLocaleDateString()}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <div role="button" onClick={() => {}}
              className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm 
                        hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <Plus className="h-4 w-4 text-muted-foreground" />
              </div>
            
          </div> 
        </div>
        </div>
      )))
      ) }
 
    

    </div>
   
  );
};

export default AllNotesList;


