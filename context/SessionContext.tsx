"use client";

import { getUserSession } from "@/utils/getUserSession";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface SessionContextType {
  sessionId: string | undefined;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      const session = await getUserSession();
      setSessionId(session);
      setIsLoading(false);
    }
    fetchSession();
  }, []);

  return (
    <SessionContext.Provider value={{ sessionId, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
