import { Injectable } from '@angular/core';
import { Flight } from "../../../flight/flight";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ManagePlaneService {

  constructor(private http: HttpClient) {
  }

  addPLane(flight: Flight) {
    return this.http.post(`${environment.apiUrl}planes`, flight);
  }

  getPLanes(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${environment.apiUrl}planes`);
  }

  getPLane(id: string) {
    return this.http.get(`${environment.apiUrl}planes/${id}`);
  }

  updatePlane(id: string, flight: Flight) {
    return this.http.put(`${environment.apiUrl}planes/${id}`, flight);
  }

  deletePlane(id: string) {
    return this.http.delete(`${environment.apiUrl}planes/${id}`);
  }
}
