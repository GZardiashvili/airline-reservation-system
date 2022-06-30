import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";
import { Airline } from "../airline";

@Injectable({
  providedIn: 'root'
})
export class ManageAirlineService {

  constructor(private http: HttpClient) {
  }

  addAirline(airline: Airline) {
    return this.http.post<Airline>(`${environment.apiUrl}airlines`, airline);
  }

  getAirlines(query: string): Observable<Airline[]> {
    return this.http.get<Airline[]>(`${environment.apiUrl}airlines/?q=${query}`);
  }

  getAirline(id: string) {
    return this.http.get(`${environment.apiUrl}airlines/${id}`);
  }

  updateAirline(id: string, airline: Airline) {
    return this.http.put(`${environment.apiUrl}airlines/${id}`, airline);
  }

  deleteAirline(id: string) {
    return this.http.delete(`${environment.apiUrl}airlines/${id}`);
  }
}
