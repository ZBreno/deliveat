import { useQuery } from "@tanstack/react-query";
import { QueryKeysTickets } from "./queryKeys";
import { getTickets } from "../services/tickets";

export const useGetTickets = () =>
  useQuery({
    queryKey: QueryKeysTickets.all,
    queryFn: async () => {
      const response = await getTickets;

      return response.data;
    },
  });
