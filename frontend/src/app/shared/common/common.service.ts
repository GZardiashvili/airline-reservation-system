import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private update$ = new BehaviorSubject<string>('');

  constructor() {
  }

  sendUpdate(message: any) {
    this.update$.next(message);
  }

  getUpdate(): Observable<any> {
    return this.update$.asObservable();
  }
}
