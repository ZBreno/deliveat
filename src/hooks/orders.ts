import { useQuery } from "@tanstack/react-query";
import { QueryKeysOrders } from "./queryKeys";
import { getMyOrders } from "../services/orders";

export const useGetMyOrders = () =>
  useQuery({
    queryKey: QueryKeysOrders.all,
    queryFn: async () => {
      const response = await getMyOrders;

      return response.data;
    },
  });
