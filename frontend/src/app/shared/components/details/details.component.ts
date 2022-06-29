import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { List } from "../admin-list/list";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  readonly cancel: IconProp = faTimes;
  readonly edit: IconProp = faEdit
  @Input() details!: List | null;
  @Output() onClick = new EventEmitter<any>();
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
