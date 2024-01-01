import request from "../utils/request";

export const login = (data: { email: string; password: string }) =>
  request.post("auth/token", data);

export const logout = () => new Promise((resolve) => resolve(null));
