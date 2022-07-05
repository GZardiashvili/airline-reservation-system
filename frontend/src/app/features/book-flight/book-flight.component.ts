import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Plane } from "../ars-manager/manage-plane/plane";
import { map, Observable } from "rxjs";
import { CommonService } from "../../shared/common/common.service";
import { BookFlightService } from "./services/book-flight.service";
import { Router } from "@angular/router";
import { STEPPER_GLOBAL_OPTIONS, StepperOrientation } from "@angular/cdk/stepper";
import { BreakpointObserver } from "@angular/cdk/layout";

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
  stepperOrientation: Observable<StepperOrientation>;
  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    ticketCount: ['1', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder, private commonService: CommonService,
              private bookingService: BookFlightService, private router: Router, private breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    if (this.isAuthenticated()) {
      this.commonService.getUpdate().subscribe(
        user => {
          this.firstFormGroup.patchValue({
            ...user,
          });
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

  bookedFlightObj = {
    firstName: '',
    lastName: '',
    email: '',
    flightId: '',
    class: 'First Class',
  }

  bookFlight() {
    this.commonService.getUpdate().subscribe(
      user => {
        this.bookedFlightObj.firstName = user.firstName;
        this.bookedFlightObj.lastName = user.lastName;
        this.bookedFlightObj.email = user.email;
      }
    );
    this.commonService.getValue().subscribe(flight => {
      this.bookedFlightObj.flightId = flight._id;
      console.log(this.bookedFlightObj);
      this.bookingService.bookFlight(this.bookedFlightObj).subscribe(
        () => {
          alert('Flight booked successfully');
        }
      );
    });
    this.router.navigate(['/booked-flights']);
  }

}
