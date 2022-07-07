import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
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
  quantity!: number;
  sendBooking = {
    firstName: '',
    lastName: '',
    email: '',
    flightId: '',
    class: '',
  };
  passengers = [this.sendBooking];

  constructor(private _formBuilder: FormBuilder, private commonService: CommonService,
              private bookingService: BookFlightService, private router: Router) {

  }

  flightId!: string;
  userEmail!: string;

  ngOnInit(): void {
    this.commonService.getValue().subscribe(flight => {
      this.flightId = flight._id;
    })
    this.commonService.getQuantity().subscribe(quantity => {
      this.quantity = quantity;
    })
    if (this.isAuthenticated()) {
      this.commonService.getUpdate().subscribe(
        user => {
          this.firstName['controls'][0]?.setValue(user.firstName);
          this.lastName['controls'][0].setValue(user.lastName);
          // this.email['controls'][0].setValue(user.email);
          this.userEmail = user.email;
        }
      );
    }
    for (let i = 0; i < this.quantity - 1; i++) {
      // this.email.push(this.createEmailFormControl());
      this.firstName.push(this.createFirstNameFormControl());
      this.lastName.push(this.createLastNameFormControl());
      this.class.push(this.createClassFormControl());
    }
  }

  private createEmailFormControl(): FormControl {
    return new FormControl(null);
  }

  private createFirstNameFormControl(): FormControl {
    return new FormControl(null);
  }

  private createLastNameFormControl(): FormControl {
    return new FormControl(null);
  }

  private createClassFormControl(): FormControl {
    return new FormControl(null);
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

  bookingObj: FormGroup = new FormGroup({
    firstName: new FormArray([new FormControl(null)]),
    lastName: new FormArray([new FormControl(null)]),
    email: new FormArray([new FormControl(null)]),
    flightId: new FormArray([new FormControl(null)]),
    class: new FormArray([new FormControl(null)]),
  });

  // passengers = [this.bookingObj.value];


  get firstName() {
    return this.bookingObj.get('firstName') as FormArray;
  }

  get lastName() {
    return this.bookingObj.get('lastName') as FormArray;
  }

  get email() {
    return this.bookingObj.get('email') as FormArray;
  }

  get class() {
    return this.bookingObj.get('class') as FormArray;
  }

  transformBookingForm(bookingForm: any) {
    let sendBooking = [];
    for (let i = 0; i < bookingForm.firstName.length; i++) {
      sendBooking.push({
        firstName: bookingForm.firstName[i],
        lastName: bookingForm.lastName[i],
        email: this.userEmail,
        flightId: this.flightId,
        class: bookingForm.class[i].value,
      });
    }
    return sendBooking;
  }

  bookFlight() {
    // this.commonService.getValue().subscribe(flight => {
    //   this.bookingObj.get('flightId')?.setValue(flight._id);
    // })

    let passengers = this.transformBookingForm(this.bookingObj.value);

    passengers.forEach((passenger: any) => {
      this.bookingService.bookFlight(passenger).subscribe();
    })
    this.router.navigate(['/booked-flights']);
  }

}
