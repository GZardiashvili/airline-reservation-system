import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { List } from "../admin-list/list";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() details!: List | null;
  detailsForm = this.fb.group({
    company: [''],
    model: [''],
    firstName: [''],
    lastName: [''],
    email: [''],
    phone: [''],
    country: [''],
    state: [''],
    city: [''],
    flightNumber: [''],
    airlineCode: [''],
    status: [''],
    description: [''],
    flightIds: [''],
    flightId: [''],
    userId: [''],
    airlineId: [''],
    planeId: [''],
    seats: [''],
    ticketId: [''],
    price: [''],
    departureCity: [''],
    arrivalCity: [''],
    departureAirport: [''],
    arrivalAirport: [''],
    departureTime: [''],
    arrivalTime: [''],
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

}
