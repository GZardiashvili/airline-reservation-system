import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Flight } from "../../flight/flight";
import { ManageFlightService } from "./services/manage-flight.service";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CommonService } from "../../../shared/common/common.service";

@Component({
  selector: 'app-manage-flight',
  templateUrl: './manage-flight.component.html',
  styleUrls: ['./manage-flight.component.scss']
})
export class ManageFlightComponent implements OnInit {

  flights$!: Observable<Flight[]>;
  flight$!: Observable<Flight>;
  status = ['All', 'Active', 'Cancelled'];
  headers = ['Flight Code', 'From - To', 'Duration', 'Flight Status'];
  view: 'details' | 'edit' | 'create' | 'none' = 'none';

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

  constructor(private manageFlightService: ManageFlightService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private commonService: CommonService) {
  }

  editView() {
    this.view = 'edit';
    this.flightFormGroup.reset();
  }

  showDetails() {
    this.view = 'details';
  }

  createView() {
    this.view = 'create';
  }

  addFlight() {
    this.manageFlightService.addFlight(<Flight>this.flightFormGroup.value).subscribe();
  }

  getFlight(id: string) {
    this.flight$ = this.manageFlightService.getFlight(id);
  }

  ngOnInit(): void {
    this.flights$ = this.manageFlightService.getFlights();
  }

}
