import { Injectable } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Plane } from "../plane";

@Injectable({
  providedIn: 'root'
})
export class ManagePlaneService {

  constructor(private http: HttpClient) {
  }

  addPlane(plane: Plane) {
    return this.http.post<Plane>(`${environment.apiUrl}planes`, plane);
  }

  getPlanes(): Observable<Plane[]> {
    return this.http.get<Plane[]>(`${environment.apiUrl}planes`);
  }

  getPlane(id: string) {
    return this.http.get(`${environment.apiUrl}planes/${id}`);
  }

  updatePlane(id: string, plane: Plane) {
    return this.http.put(`${environment.apiUrl}planes/${id}`, plane);
  }

  deletePlane(id: string) {
    return this.http.delete(`${environment.apiUrl}planes/${id}`);
  }
}
