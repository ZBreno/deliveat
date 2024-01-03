import request from "../utils/request";

export const getMyOrders = request.get("order/list/my_orders");

export const createOrder = (data: unknown) => request.post(`order/add`, data);
