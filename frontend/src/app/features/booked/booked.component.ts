import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { BookedService } from "./services/booked.service";

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.scss']
})
export class BookedComponent implements OnInit {
  bookings$!: Observable<any[]>;

  constructor(private bookedService: BookedService) {
  }

  ngOnInit(): void {
    this.bookings$ = this.bookedService.getBookings();
  }

}
