import { useQuery } from "@tanstack/react-query";
import { QueryKeysProducts } from "./queryKeys";
import { getMyProducts } from "../services/products";

export const useGetMyProducts = (uuid: string) =>
  useQuery({
    queryKey: QueryKeysProducts.all,
    queryFn: async () => {
      const response = await getMyProducts(uuid);

      return response.data;
    },
  });
