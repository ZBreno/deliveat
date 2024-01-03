import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { QueryKeysOrders } from "./queryKeys";
import { createOrder, getMyOrders } from "../services/orders";
const queryClient = new QueryClient();

export const useGetMyOrders = () =>
  useQuery({
    queryKey: QueryKeysOrders.all,
    queryFn: async () => {
      const response = await getMyOrders;

      return response.data;
    },
  });

queryClient.setMutationDefaults(["createOrder"], {
  mutationFn: createOrder,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  },
});

export const useCreateOrder = () =>
  useMutation({
    mutationKey: ["createOrder"],
    mutationFn: createOrder,
  });
