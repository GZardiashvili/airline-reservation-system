import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ManagePlaneService } from "../ars-manager/manage-plane/services/manage-plane.service";
import { Plane } from "../ars-manager/manage-plane/plane";
import { Observable } from "rxjs";

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

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  constructor(private _formBuilder: FormBuilder, private planeService: ManagePlaneService) {
  }

  ngOnInit(): void {

  }

  bookFlight() {
    this.plane$ = this.planeService.getPlane('62b5ba26661dace0bcb30b45');
    this.plane$.subscribe(plane => {
      if (plane.seats) {
        this.planeService.updatePlane('62b5ba26661dace0bcb30b45', {...plane, seats: plane.seats - 1}).subscribe();
      }
    });
  }

}
