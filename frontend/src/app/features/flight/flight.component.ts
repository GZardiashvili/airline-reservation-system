import { Component, OnInit } from '@angular/core';
import { faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FlightService } from "./services/flight.service";
import { FormBuilder } from "@angular/forms";
import { Flight } from "./flight";
import { Observable } from "rxjs";
import { ManageUserService } from "../ars-manager/manage-user/services/manage-user.service";
import { CommonService } from "../../shared/common/common.service";

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {
  flights$!: Observable<Flight[]>;
  flight$!: Observable<Flight>;
  faHeart = faHeart
  faLocation = faLocationDot
  flightForm = this.fb.group({
    flightNumber: [''],
    description: [''],
    airline: [''],
    plane: [''],
    ticket: [''],
    departureCity: [''],
    arrivalCity: [''],
    departureTime: [''],
    arrivalTime: [''],
  })

  constructor(private fb: FormBuilder,
              private flightService: FlightService,
              private userService: ManageUserService,
              private commonService: CommonService) {

  }

  ngOnInit(): void {
    this.flights$ = this.flightService.getFlights();

  }

  getFlight(id: string | undefined) {
    this.userService.getUser(String(localStorage.getItem('userId'))).subscribe(
      user => {
        this.commonService.sendUpdate(user);
      }
    )

    this.flight$ = this.flightService.getFlight(String(id));
    this.flight$.subscribe(flight => {
      this.commonService.sendValue(flight);
    });
  }

}
