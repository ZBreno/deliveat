import request from "../utils/request";

export const loadLoggedInUser = () => request.get("user/me");

export const createAccount = (data: unknown) =>
  request.post("auth/signup", data);
