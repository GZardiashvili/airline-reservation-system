import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Location } from "../location";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${environment.apiUrl}locations`);
  }
}
