import { Injectable } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "../user";

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(private http: HttpClient) {
  }

  addUser(flight: User) {
    return this.http.post(`${environment.apiUrl}users`, flight);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}users`);
  }

  getUser(id: string) {
    return this.http.get<User>(`${environment.apiUrl}users/${id}`);
  }

  updateUser(id: string, flight: User) {
    return this.http.put(`${environment.apiUrl}users/${id}`, flight);
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.apiUrl}users/${id}`);
  }
}
