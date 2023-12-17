import { ticketsModel } from "../../models/tickets.model.js";


export class TicketsMongo{
    constructor(){
        this.model = ticketsModel;
    };

    async createTicket(ticketInfo){
        try {
            const result = await this.model.create(ticketInfo);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    async getTicketByCode(ticketCode) {
        const ticket = await ticketsModel.findOne({ code: ticketCode });
        if (!ticket) {
          throw new CustomError(`Ticket not found for code: ${ticketCode}`, 'QUERY_ERROR');
        }
        return ticket;
      }
    
}