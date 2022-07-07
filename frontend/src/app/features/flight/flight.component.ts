import { Component, OnInit } from '@angular/core';
import { faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FlightService } from "./services/flight.service";
import { FormBuilder } from "@angular/forms";
import { Flight } from "./flight";
import { combineLatest, Observable, switchMap } from "rxjs";
import { ManageUserService } from "../ars-manager/manage-user/services/manage-user.service";
import { CommonService } from "../../shared/common/common.service";
import { ManageTicketService } from "../ars-manager/manage-ticket/services/manage-ticket.service";
import { Ticket } from "../ars-manager/manage-ticket/ticket";
import { PrimeNGConfig, SelectItem } from "primeng/api";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {
  flights: Flight[] = [];
  flight$!: Observable<Flight>;
  ticket$!: Observable<Ticket>
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
  quantity: number = 1;

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;
  sortKey: any;

  constructor(private fb: FormBuilder,
              private flightService: FlightService,
              private userService: ManageUserService,
              private route: ActivatedRoute,
              private ticketService: ManageTicketService,
              private commonService: CommonService,
              private primengConfig: PrimeNGConfig) {

  }

  ngOnInit(): void {
    combineLatest([
      this.route.queryParamMap,
    ]).pipe(
      switchMap(([params]) => {
        if (params.get('from') && params.get('to')) {
          return this.flightService.getFlights(String(params.get('from')), String(params.get('to')));
        } else {
          return this.flightService.getFlights();
        }
      })
    ).subscribe(data => {
        this.flights = data;
      }
    )
    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
    ];

    this.primengConfig.ripple = true;
    combineLatest([
      this.route.paramMap,
    ]).pipe(
      switchMap(([params]) => {
        return this.flightService.getFlights(String(params.get('search')));
      })
    ).subscribe(data => {
        this.flights = data;
      }
    )
  }

  getFlight(id: string | undefined) {
    this.userService.getUser(String(localStorage.getItem('userId'))).subscribe(
      user => {
        this.commonService.sendUpdate(user);
      }
    )
    this.commonService.sendQuantity(this.quantity);
    this.flight$ = this.flightService.getFlight(String(id));
    this.flight$.subscribe(flight => {
      this.commonService.sendValue(flight);
    });
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
