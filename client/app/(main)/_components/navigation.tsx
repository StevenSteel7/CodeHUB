"use client";

import { ChevronsLeft, MenuIcon, PlusCircle } from "lucide-react"
import { ComponentRef, use, useEffect, useRef, useState } from 'react';
import {useMediaQuery} from 'react-responsive';
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import UserItem from "./user-item";
import { useSession } from "@/context/sessionContext";
import NoteListItem from "./noteListItem";
import createNewNote from "./createNewNote";
import { Button } from "@/components/ui/button";

const navigation = () => {
    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ComponentRef<"aside">>(null); // causing hydration problem
    const navbarRef = useRef<HTMLDivElement | null>(null);
    const [isResetting, setIsResetting] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const [isCollapsed, setIsCollapsed] = useState(isMobile)
    const pathname = usePathname();
    const sessionContext = useSession();
   const session = sessionContext ? sessionContext.session : null;


    //use useeffect to constantally monitor the changes
    useEffect(() => {
        if (isMobile) {
          collapse();
        } else {
          resetWidth();
        }
      }, [pathname, isMobile]); // activate when we switch to mobile    // we used pathname
    /* how pathname helps useeffect to monitor the changes?
    *  pathname is a hook that returns the current pathname of the URL.
    *  It's a string representing the path of the URL. so if user changes the path, the useEffect will be triggered
    */


    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
      ) => {
        event.preventDefault();
        event.stopPropagation();
    
        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      };
    
    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty(
            "width",
            `calc(100% - ${newWidth}px)`
            );}
        };
    
      const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      
      const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
          setIsCollapsed(false);
          setIsResetting(true);
    
          sidebarRef.current.style.width = isMobile ? "100%" : "240px";
          navbarRef.current.style.setProperty("width",isMobile ? "0" : "calc(100% - 240px)");
          navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
          setTimeout(() => setIsResetting(false), 300);
        }
      };

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
          setIsCollapsed(true);
          setIsResetting(true);
    
          sidebarRef.current.style.width = "0";
          navbarRef.current.style.setProperty("width", "100%");
          navbarRef.current.style.setProperty("left", "0");
          setTimeout(() => setIsResetting(false), 300);
        }
      };



  return (
   <>
   <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-screen bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
    
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
            <ChevronsLeft className="h-6 w-6 "/>    
        </div>
        <div>
            <UserItem />
            {/* <NoteListItem onClick = {createNewNote} label = "New page" icon ={PlusCircle}/> */}
            
              <Button onClick={() => createNewNote(session)} />
        </div>

        <div className="mt-4">
            <p>Docs</p>
        </div>   
                           {/* for group/sidebar */}
        <div
            onMouseDown= {handleMouseDown}
            onClick = {(e) => {}}
            className="opacity-0 group-hover/sidebar:opacity-100 
            transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0 "
        />


      
    </aside>
    <div ref ={navbarRef}                               //to appear on top all else
        className={cn("absolute top-0 left-60 right-0 z-[9999] w-[calc(100%-240px)]",
        isResetting && "transition-all ease-in-out duration-300",
        isMobile && "left-0 w-full")}>

        <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>

        
    </div>
    </>
  )
}

export default navigation

