import { useMutation, QueryClient } from "@tanstack/react-query";
import { createRating } from "../services/rating";
const queryClient = new QueryClient();

queryClient.setMutationDefaults(["createRating"], {
  mutationFn: createRating,
});

export const useCreateRating = () =>
  useMutation({
    mutationKey: ["createRating"],
    mutationFn: createRating,
  });
