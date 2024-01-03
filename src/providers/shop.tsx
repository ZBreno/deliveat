import { createContext } from "react";
import { useProviderShop } from "../hooks/useProviderShop";

type ShopContextType = ReturnType<typeof useProviderShop>;

export const shopContext = createContext<ShopContextType>(null);

export const ShopProvider = ({ children }) => {
  return (
    <shopContext.Provider value={useProviderShop()}>
      {children}
    </shopContext.Provider>
  );
};
