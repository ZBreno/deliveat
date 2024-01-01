import { useMutation, QueryClient } from "@tanstack/react-query";
import { QueryKeysCategories } from "./queryKeys";
import { createAccount } from "../services/me";

const queryClient = new QueryClient();

queryClient.setMutationDefaults(["createAccount"], {
  mutationFn: createAccount,
});

export const useCreateAccount = () =>
  useMutation({
    mutationKey: ["createAccount"],
    mutationFn: createAccount,
  });
