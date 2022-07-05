import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { BookedService } from "./services/booked.service";
import { Flight } from "../flight/flight";

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss']
})
export class BookedComponent implements OnInit {
  bookings$!: Observable<any[]>;
  flightInfo$!: Observable<Flight>;

  constructor(private bookedService: BookedService) {
  }

  ngOnInit(): void {
    this.bookings$ = this.bookedService.getBookings();
    this.bookings$.subscribe(bookings => {
      bookings.forEach(booking => {
          this.flightInfo$ = this.bookedService.getFlightInfo(booking.flightId);
        }
      )
    })
  }

}
