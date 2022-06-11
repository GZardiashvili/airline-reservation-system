import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {
  }


  clearStorage() {
    localStorage.clear();
  }

  fillStorage(res: any) {
    localStorage.setItem('token', res['token']);
    localStorage.setItem('role', res['role']);
    localStorage.setItem('userId', res['id']);
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
