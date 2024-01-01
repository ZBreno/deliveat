import { useQuery } from "@tanstack/react-query";
import { QueryKeysCategories } from "./queryKeys";
import { getCategories } from "../services/categories";

export const useGetCategories = () =>
  useQuery({
    queryKey: QueryKeysCategories.all,
    queryFn: async () => {
      const response = await getCategories;

      return response.data;
    },
  });
