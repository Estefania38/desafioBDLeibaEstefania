import { ticketsDao } from "../dao/factory.js";

export class TicketsService {
    static async createTicket(ticketInfo){
        return await ticketsDao.createTicket(ticketInfo);
    };
};