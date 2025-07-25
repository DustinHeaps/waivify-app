"use client";

import { createContext, useContext } from "react";

export const Clerk404Context = createContext(false);
export const useClerk404 = () => useContext(Clerk404Context);

export function Clerk404Provider({ children }: { children: React.ReactNode }) {
  return (
    <Clerk404Context.Provider value={true}>
      {children}
    </Clerk404Context.Provider>
  );
}
