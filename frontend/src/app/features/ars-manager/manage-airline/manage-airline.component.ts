import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ManageAirlineService } from "./services/manage-airline.service";
import { FormBuilder, } from "@angular/forms";
import { Flight } from "../../flight/flight";
import { ManageFlightService } from "../manage-flight/services/manage-flight.service";
import { Airline } from "./airline";

@Component({
  selector: 'app-manage-airline',
  templateUrl: './manage-airline.component.html',
  styleUrls: ['./manage-airline.component.scss']
})
export class ManageAirlineComponent implements OnInit {

  airlines$!: Observable<Airline[]>;
  flights$!: Observable<Flight[]>;
  airlineFormGroup = this.fb.group({
    name: [''],
    airlineCode: [''],
    airlineDescription: [''],
    flightId: [''],
  });

  constructor(private manageAirlineService: ManageAirlineService, private manageFlightService: ManageFlightService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.airlines$ = this.manageAirlineService.getAirlines();
    this.flights$ = this.manageFlightService.getFlights();
  }

  addAirline() {
    return this.manageAirlineService.addAirline(<Airline>this.airlineFormGroup.value).subscribe()
  }

}
