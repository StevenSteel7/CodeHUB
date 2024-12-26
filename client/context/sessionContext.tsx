'use client'; // Mark as client-side for use in Client Components

import React, { createContext, useContext, useEffect, useState } from "react";



// make it null safe:
interface SessionContextType {
  session: any ;
  setSession: React.Dispatch<any>;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children, initialSession }: { children: React.ReactNode; initialSession: any }) => {
  const [session, setSession] = useState(initialSession);

  useEffect(() => {
    
    if (initialSession) {
      setSession(initialSession);
    }

  }, []);





  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
