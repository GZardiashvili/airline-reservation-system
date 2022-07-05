import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Plane } from "../ars-manager/manage-plane/plane";
import { Observable } from "rxjs";
import { CommonService } from "../../shared/common/common.service";
import { BookFlightService } from "./services/book-flight.service";
import { Router } from "@angular/router";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class BookFlightComponent implements OnInit {
  plane$!: Observable<Plane>;
  selectedClass!: string;

  constructor(private _formBuilder: FormBuilder, private commonService: CommonService,
              private bookingService: BookFlightService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.isAuthenticated()) {
      this.commonService.getUpdate().subscribe(
        user => {
          this.bookingObj.firstName = user.firstName;
          this.bookingObj.lastName = user.lastName;
          this.bookingObj.email = user.email;
        }
      );
    }
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  chooseTicketClass = [
    {value: 'Economy', viewValue: 'Economy'},
    {value: 'Business', viewValue: 'Business'},
    {value: 'First', viewValue: 'First'},
  ]
  bookingObj = {
    firstName: '',
    lastName: '',
    email: '',
    flightId: '',
    class: 'First Class',
  };
  passengers = [this.bookingObj];

  addPassenger() {
    this.passengers.push(this.bookingObj);
  }

  bookFlight() {
    this.commonService.getValue().subscribe(flight => {
      this.bookingObj.flightId = flight._id;
    })

    this.bookingService.bookFlight(this.bookingObj).subscribe();
    this.router.navigate(['/booked-flights']);
  }

}
