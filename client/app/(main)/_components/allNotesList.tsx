'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';



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
  icon : LucideIcon;
};



const AllNotesList = ({ session ,onClick ,notes ,setnotes ,loading, icon: Icon,}: ItemProps ) => {  
  let active = true;

  return (
    <div>

    {notes.length > 0 ? (
        notes.map((note: any) => (
           (
            <div key={note._id} className="note-item">
              <div 
                onClick={onClick}
                role="button"
                className={cn(
                  "group min-h-[27px] text-sm py-1 pl-3 w-full flex items-center text-muted-foreground font-medium",
                  "hover:bg-neutral-300 dark:hover:bg-neutral-600"
                )}
              >
                <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
                <span className="truncate">
                  
                  {note?.title}
                </span>
              </div>
            </div>
          )
        ))
      ) : (
        !loading && <p>No notes available</p>
      )}
      


      {/*    <div
              role="button"
              className=""
              onClick={()=>{}}
            >
          <div className="notes-list" key = {notes._id} >
          {notes.map((note:any) => (
            <div key={note._id} className="note-item">
              <h1>{note.title || 'Untitled'}</h1>
              <p>{note.content || 'No content available'}</p>
            </div>
          ))} 
        </div>
      </div>  */}


    </div>
   
  );
};

export default AllNotesList;
