import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Flight } from "../../flight/flight";
import { HttpClient } from "@angular/common/http";
import { ManageFlightService } from "./services/manage-flight.service";

@Component({
  selector: 'app-manage-flight',
  templateUrl: './manage-flight.component.html',
  styleUrls: ['./manage-flight.component.scss']
})
export class ManageFlightComponent implements OnInit {

  flights$!: Observable<Flight[]>;

  constructor(private flightManageService: ManageFlightService) {
  }

  ngOnInit(): void {
    this.flights$ = this.flightManageService.getFlights();
  }

}
