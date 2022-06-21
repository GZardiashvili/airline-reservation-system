import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Flight } from "../../flight/flight";
import { ManageFlightService } from "./services/manage-flight.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-manage-flight',
  templateUrl: './manage-flight.component.html',
  styleUrls: ['./manage-flight.component.scss']
})
export class ManageFlightComponent implements OnInit {

  flights$!: Observable<Flight[]>;
  status = ['All', 'Active', 'Cancelled'];
  flightFormGroup = this.fb.group({
    flightNumber: [''],
    description: [''],
    airlineId: [''],
    planeId: [''],
    ticketId: [''],
    departureCity: [''],
    arrivalCity: [''],
    departureAirport: [''],
    arrivalAirport: [''],
    departureTime: [''],
    arrivalTime: [''],
  });

  constructor(private flightManageService: ManageFlightService, private fb: FormBuilder) {
  }

  addFlight() {
    this.flightManageService.addFlight(<Flight>this.flightFormGroup.value);
  }

  ngOnInit(): void {
    this.flights$ = this.flightManageService.getFlights();
  }

}
