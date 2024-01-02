import request from "../utils/request";

export const getStories = request.get("user/stories");

export const getEstablishment = request.get("user/establishment");

export const getStore = (id: string) => request.get(`user/get/${id}`);
