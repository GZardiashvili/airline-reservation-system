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
  status = ['All', 'Active', 'Cancelled'];
  headers = ['Flight Code', 'From - To', 'Duration', 'Flight Status'];
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

  constructor(private flightManageService: ManageFlightService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private commonService: CommonService) {
  }

  addFlight() {
    this.flightManageService.addFlight(<Flight>this.flightFormGroup.value).subscribe();
  }

  ngOnInit(): void {
    this.flights$ = this.flightManageService.getFlights();
  }

}
