import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { BookedService } from "./services/booked.service";
import { Flight } from "../flight/flight";
import { PrimeNGConfig, SelectItem } from "primeng/api";

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss']
})
export class BookedComponent implements OnInit {
  bookings$!: Observable<any[]>;
  flightInfo$!: Observable<Flight>;
  products!: any [];

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;
  sortKey: any;

  constructor(private bookedService: BookedService, private primengConfig: PrimeNGConfig) {
  }

  ngOnInit(): void {
    this.bookings$ = this.bookedService.getBookings();

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

  cancelFlight() {
    console.log('cancelFlight');
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
}
