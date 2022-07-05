import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BookFlightService {

  constructor(private http: HttpClient) {
  }

  bookFlight(booking: any) {
    return this.http.post(`${environment.apiUrl}bookings`, booking);
  }
}
