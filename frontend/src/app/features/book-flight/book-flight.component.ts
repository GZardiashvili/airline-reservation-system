import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Plane } from "../ars-manager/manage-plane/plane";
import { Observable } from "rxjs";
import { CommonService } from "../../shared/common/common.service";
import { ManageFlightService } from "../ars-manager/manage-flight/services/manage-flight.service";
import { BookFlightService } from "./services/book-flight.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss']
})
export class BookFlightComponent implements OnInit {
  plane$!: Observable<Plane>;
  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;


  constructor(private _formBuilder: FormBuilder, private commonService: CommonService,
              private bookingService: BookFlightService, private router: Router) {
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
    setTimeout(() => {
      this.router.navigate(['/booked-flights']);
    }, 1000);
  }

}
