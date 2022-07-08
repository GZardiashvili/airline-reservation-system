import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { Flight } from "../../flight/flight";
import { Ticket } from "../../ars-manager/manage-ticket/ticket";
import { User } from "../../ars-manager/manage-user/user";

@Injectable({
  providedIn: 'root'
})
export class BookedService {

  constructor(private http: HttpClient) {
  }

  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}bookings`);
  }

  getFlightInfo(flightId: string): Observable<Flight> {
    return this.http.get<Flight>(`${environment.apiUrl}flights/${flightId}`);
  }

  getTicket(ticketId: string): Observable<Ticket> {
    return this.http.get<any>(`${environment.apiUrl}tickets/${ticketId}`);
  }

  cancelTicket(id: string) {
    return this.http.delete(`${environment.apiUrl}bookings/${id}`);
  }
}
