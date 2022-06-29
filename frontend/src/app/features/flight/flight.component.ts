import { Component, OnInit } from '@angular/core';
import { faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FlightService } from "./services/flight.service";
import { FormBuilder } from "@angular/forms";
import { Flight } from "./flight";
import { Observable } from "rxjs";

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

  constructor(private fb: FormBuilder, private flightService: FlightService) {

  }

  ngOnInit(): void {
    this.flights$ = this.flightService.getFlights();

  }

  getFlight(id: string | undefined) {
    this.flight$ = this.flightService.getFlight(String(id));
  }
}
