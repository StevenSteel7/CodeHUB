"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

interface ItemProps{
    id? : string; // only will have id if its a note
    documentIcon? : string;
    active? : boolean;
    expanded? : boolean;
    isSearch? : boolean;
    level? : number;
    onExpand?: () => void;
    label  : string;
    onClick : () => void;
    icon : LucideIcon;
};


 const Item  = ({
    label ,
    onClick,
    icon: Icon,
    active,
    id,
    documentIcon,
    expanded,
    isSearch,
    level = 0,
    onExpand,
    

 } : ItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div onClick={onClick} 
      role = "button"
      style={{ 
        paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
      }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}>

      {/* id will act like boolean if id is there */}
      {!!id && (
          <div
            role="button"
            className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 "
            onClick={()=>{}}
          > {/* // props of the div */}
          
          </div>
        )}
      {documentIcon ? (
          <div className="shrink-0 mr-2 text-[18px]">
            {documentIcon}
          </div>
        ) : (
          <Icon 
            className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground"
          />
        )}  

      <span className="truncate">
        {label }
      </span>

      {isSearch && (
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none 
          items-center gap-1 rounded border bg-muted px-1.5 font-mono 
          text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">Ctrl</span>K
          </kbd>
        )}

    </div>
  )
}

export default Item;





