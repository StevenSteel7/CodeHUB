'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileIcon, LucideIcon, MoreHorizontal, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DropdownMenu, 
          DropdownMenuSeparator, 
          DropdownMenuTrigger, 
          DropdownMenuContent,
        DropdownMenuItem} from '@/components/ui/dropdown-menu';



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
  onClick : () => void;

};



const AllNotesList = ({ session ,onClick ,notes ,setnotes ,loading}: ItemProps ) => {  
  let active = true;

  return (
    <div>
      {notes.length > 0 ? (
      notes.map((note: any) => (
        <div key={note._id} className="note-item">
        <div
          onClick={onClick}
          role="button"
          className={cn(
          "group min-h-[27px] text-sm py-1 pl-3 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
          note.active && "bg-primary/5 text-primary"
          )}
        >
        
          <FileIcon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
          
          <span className="truncate">{note?.title}</span>
          
            
            <div
            role="button"
            onClick={() => {}}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm 
                      hover:bg-neutral-300 dark:hover:bg-neutral-600"
            >

            
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        </div>
      ))
      ) : (
      !loading && <p>No notes available</p>
      )}
 
    

    </div>
   
  );
};

export default AllNotesList;


