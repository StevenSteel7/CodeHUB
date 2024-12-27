"use client";

import { LucideIcon } from "lucide-react";

interface ItemProps{
    label  : string;
    onClick : () => void;
    icon : LucideIcon;
};


 const NoteListItem  = ({
    label ,
    onClick,
    icon: Icon
 } : ItemProps) => {
  return (
    <div onClick={onClick} 
    role = "button"
    style = {{padding : "12px"}}
    className="group min-h-[27x] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium">
    <Icon className = "shrink-0 h-[18px] mr-2"/>
    <span className="truncate">
    {label }
    </span>
    </div>
  )
}

export default NoteListItem;
