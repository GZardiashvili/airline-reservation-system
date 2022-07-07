import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private update$ = new BehaviorSubject<string>('');
  private value$ = new BehaviorSubject<any>('');
  private quantity$ = new BehaviorSubject<number>(1);

  constructor() {
  }

  sendUpdate(message: any) {
    this.update$.next(message);
  }

  sendValue(message: any) {
    this.value$.next(message);
  }

  sendQuantity(message: number) {
    this.quantity$.next(message);
  }

  getUpdate(): Observable<any> {
    return this.update$.asObservable();
  }

  getValue(): Observable<any> {
    return this.value$.asObservable();
  }

  getQuantity(): Observable<number> {
    return this.quantity$.asObservable();
  }
}
