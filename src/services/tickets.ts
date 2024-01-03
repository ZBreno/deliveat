import request from "../utils/request";

export const getTickets = request.get("ticket/last_tickets");

export const getTicket = (code: string) => request.get(`ticket/get/${code}`);
