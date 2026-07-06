import { createContext, useEffect, useState, type ReactNode } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggle: () => void;
};

const STORAGE_KEY = "@louvor:sidebar-open";

export const SidebarContext = createContext({} as SidebarContextType);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      setIsOpen(stored === "true");
    }
  }, []);

  function toggle() {
    setIsOpen((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}
