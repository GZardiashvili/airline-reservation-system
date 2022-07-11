import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, Observable, switchMap } from "rxjs";
import { BookedService } from "./services/booked.service";
import { Flight } from "../flight/flight";
import { PrimeNGConfig, SelectItem } from "primeng/api";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss']
})
export class BookedComponent implements OnInit {
  private readonly reloadBookings$ = new BehaviorSubject(true);

  bookings$!: Observable<any[]>;
  booking!: any;
  flightInfo$!: Observable<Flight>;
  products!: any [];

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;
  sortKey: any;

  constructor(private bookedService: BookedService, private primengConfig: PrimeNGConfig, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.bookings$ = combineLatest([
      this.route.paramMap,
      this.reloadBookings$,
    ]).pipe(
      switchMap(([params]) => {
        return this.bookedService.getBookings();
      })
    );
    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
    ];

    this.primengConfig.ripple = true;
    this.bookings$.subscribe(bookings => {
      bookings.forEach(booking => {
          this.flightInfo$ = this.bookedService.getFlightInfo(booking.flightId);
        }
      )
    })
  }

  cancelTicket(id: string) {
    return this.bookedService.cancelTicket(id)
      .subscribe(
        () => this.reloadBookings());
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  private reloadBookings(): void {
    this.reloadBookings$.next(true);
  }
}
