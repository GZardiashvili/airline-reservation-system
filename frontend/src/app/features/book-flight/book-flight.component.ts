import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.scss']
})
export class BookFlightComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

}
