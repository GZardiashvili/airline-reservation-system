import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private searchTerm$ = new BehaviorSubject<string>('');

  constructor() {
  }

  sendSearchTerm(message: string) {
    this.searchTerm$.next(message);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm$.asObservable();
  }
}
