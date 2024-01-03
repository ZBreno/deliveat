import { useContext } from "react";
import { shopContext } from "../providers/shop";

export const useShop = () => {
  return useContext(shopContext);
};
