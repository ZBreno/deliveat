import { useMutation, QueryClient, useQuery } from "@tanstack/react-query";
import { createAccount } from "../services/me";
import { QueryKeysUsers } from "./queryKeys";
import { getEstablishment, getStore, getStories } from "../services/users";

const queryClient = new QueryClient();

queryClient.setMutationDefaults(["createAccount"], {
  mutationFn: createAccount,
});

export const useCreateAccount = () =>
  useMutation({
    mutationKey: ["createAccount"],
    mutationFn: createAccount,
  });

export const useGetEstablishment = () =>
  useQuery({
    queryKey: QueryKeysUsers.all_establishment,
    queryFn: async () => {
      const response = await getEstablishment;

      return response.data;
    },
  });

export const useGetUsers = () =>
  useQuery({
    queryKey: QueryKeysUsers.all,
    queryFn: async () => {
      const response = await getStories;

      return response.data;
    },
  });

export const useGetStore = (uuid: string) =>
  useQuery({
    queryKey: QueryKeysUsers.item_establishment(uuid),
    queryFn: async () => (await getStore(uuid)).data,
  });
