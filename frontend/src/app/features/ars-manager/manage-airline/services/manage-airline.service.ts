import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManageAirlineService {

  constructor(private http: HttpClient) {
  }

  addAirline(airline: any) {
    return this.http.post(`${environment.apiUrl}airlines`, airline);
  }

  getAirlines(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}airlines`);
  }

  getAirline(id: string) {
    return this.http.get(`${environment.apiUrl}airlines/${id}`);
  }

  updateAirline(id: string, airline: any) {
    return this.http.put(`${environment.apiUrl}airlines/${id}`, airline);
  }

  deleteAirline(id: string) {
    return this.http.delete(`${environment.apiUrl}airlines/${id}`);
  }
}
