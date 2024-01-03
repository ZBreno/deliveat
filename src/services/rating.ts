import request from "../utils/request";

export const createRating = (data: unknown) => request.post("rating/add", data);
