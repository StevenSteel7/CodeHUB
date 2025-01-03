"use client";

import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/hooks/use-search";

export function SearchCommand(): JSX.Element | null {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  // Mount check to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Keyboard shortcut to toggle dialog
  useEffect(() => {
    const down = (evt: KeyboardEvent) => {
      if (evt.key === "m" && evt.ctrlKey) {
        evt.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <div className="bg-slate-600 w-full h-10 text-white flex items-center justify-center">
          hi.......
        </div>
      )}
    </>
  );
}
