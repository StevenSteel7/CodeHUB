'use client';
import React, { useEffect, useState } from 'react';

import { FileIcon, LucideIcon, Minus, MoreHorizontal, Plus, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DropdownMenu, 
          DropdownMenuSeparator, 
          DropdownMenuTrigger, 
          DropdownMenuContent,
          DropdownMenuItem} from '@/components/ui/dropdown-menu';

import softDelete from "./softDelete";

import { useRouter } from "next/navigation";



interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  isArchived: boolean;
  isPinned: boolean;
  parentId: string;
  tags: string[]; // Array of strings for tags
  userId: string;
  __v: number; // Version key, often used by MongoDB
}

interface ItemProps{
  id? : string; // only will have id if its a note
  documentIcon? : string;
  session : any;
  notes : Note[];
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
 

  const router = useRouter();

  const handleNoteClick = (noteId: string) => {
    const pathname = window.location.pathname; // Get the current pathname
    router.push(`${pathname}/${noteId}`); 
  };



  return (
    <div  >
      {notes.length > 0 && (     // only if notes are not archived
      notes.map((note: any) => ( note.isArchived == false &&(
        <div key={note._id} className="note-item" onClick={() => handleNoteClick(note._id)}>
        <div  
          role="button"
          className={cn(
          "group min-h-[27px] text-sm py-1 pl-3 pr-3 w-ful hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
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


