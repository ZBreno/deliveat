import { createContext } from "react";
import { useProviderAuth } from "../hooks/useProviderAuth";

type AuthContextType = ReturnType<typeof useProviderAuth>;

export const authContext = createContext<AuthContextType>(null);

export const AuthProvider = ({ children }) => {
  return (
    <authContext.Provider value={useProviderAuth()}>
      {children}
    </authContext.Provider>
  );
};
