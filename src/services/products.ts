import request from "../utils/request";

export const getMyProducts = (id: string) =>
  request.get(`product/list/products_store/${id}`);
