import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from "../user";

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {
  }

  signup(newUser: User) {
    return this.http
      .post(new URL('signup', environment.apiUrl).toString(), newUser)
  }
}
