import { Injectable } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";
import { Ticket } from "../ticket";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ManageTicketService {

  constructor(private http: HttpClient) {
  }

  addTicket(ticket: Ticket) {
    return this.http.post<Ticket>(`${environment.apiUrl}tickets`, ticket);
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${environment.apiUrl}tickets`);
  }

  getTicket(id: string) {
    return this.http.get<Ticket>(`${environment.apiUrl}tickets/${id}`);
  }

  updateTicket(id: string, ticket: Ticket) {
    return this.http.put<Ticket>(`${environment.apiUrl}tickets/${id}`, ticket);
  }

  deleteTicket(id: string) {
    return this.http.delete(`${environment.apiUrl}tickets/${id}`);
  }
}
