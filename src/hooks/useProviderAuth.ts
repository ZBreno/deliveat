import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import * as AuthToken from "../utils/authToken";
import request from "../utils/request";
import { login, logout } from "../services/auth";

export const QueryKeys = {
  all: ["auth"] as const,
  me: () => [...QueryKeys.all, "me"] as const,
};

export const useProviderAuth = () => {
  const [user, setUser] = useState<null | false | Record<string, string>>(
    false
  );

  const { refetch: getLoggedUser } = useQuery<any, Error>({
    queryKey: [...QueryKeys.me()],
    queryFn: async () => {
      try {
        const response: any = await request.get('user/me');
        setUser(response?.data);
        return response.data;
      } catch (error) {
        setUser(false);
        throw error;
      }
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data: any) => {
      AuthToken.setAuthToken(data.data.access_token);
      getLoggedUser();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      AuthToken.removeAuthToken();
      setUser(false);
    },
  });

  return {
    getLoggedUser,
    user,

    loginMutation,
    logoutMutation,
  };
};
