import { Injectable } from '@angular/core';
import { Flight } from "../../../flight/flight";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ManageFlightService {

  constructor(private http: HttpClient) {
  }

  addFlight(flight: Flight) {
    return this.http.post(`${environment.apiUrl}flights`, flight);
  }

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${environment.apiUrl}flights`);
  }

  getFlight(id: string) {
    return this.http.get(`${environment.apiUrl}flights/${id}`);
  }

  updateFlight(id: string, flight: Flight) {
    return this.http.put(`${environment.apiUrl}flights/${id}`, flight);
  }

  deleteFlight(id: string) {
    return this.http.delete(`${environment.apiUrl}flights/${id}`);
  }
}
