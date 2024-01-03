import { useQuery } from "@tanstack/react-query";
import { QueryKeysTickets } from "./queryKeys";
import { getTicket, getTickets } from "../services/tickets";

export const useGetTickets = () =>
  useQuery({
    queryKey: QueryKeysTickets.all,
    queryFn: async () => {
      const response = await getTickets;

      return response.data;
    },
  });
export const useGetTicket = (code: string) =>
  useQuery({
    queryKey: QueryKeysTickets.item(code),
    queryFn: async () => {
      const response = await getTicket(code);

      return response.data;
    },
  });
