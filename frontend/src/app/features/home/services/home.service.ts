import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Airport } from "../airport";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  getAirports(value: String): Observable<Airport[]> {
    return this.http.get<Airport[]>(new URL(`${environment.apiUrl}airports?q=${value}`).href);
  }
}
