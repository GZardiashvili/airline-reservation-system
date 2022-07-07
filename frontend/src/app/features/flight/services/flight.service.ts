import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Flight } from "../flight";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) {
  }

  addFlight(flight: Flight) {
    return this.http.post(`${environment.apiUrl}flights`, flight);
  }

  getFlights(from?: string, to?: string): Observable<Flight[]> {
    if (from) {
      return this.http.get<Flight[]>(`${environment.apiUrl}flights?from=${from}&to=${to}`);
    }
    return this.http.get<Flight[]>(`${environment.apiUrl}flights`);
  }

  getFlight(id: string): Observable<Flight> {
    return this.http.get<Flight>(`${environment.apiUrl}flights/${id}`);
  }

  updateFlight(id: string, flight: Flight) {
    return this.http.put(`${environment.apiUrl}flights/${id}`, flight);
  }

  deleteFlight(id: string) {
    return this.http.delete(`${environment.apiUrl}flights/${id}`);
  }
}
