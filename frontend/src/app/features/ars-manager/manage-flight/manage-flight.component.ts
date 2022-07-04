import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from "rxjs";
import { Flight } from "../../flight/flight";
import { ManageFlightService } from "./services/manage-flight.service";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CommonService } from "../../../shared/common/common.service";
import { ManageAirlineService } from "../manage-airline/services/manage-airline.service";
import { Airline } from "../manage-airline/airline";
import { ManagePlaneService } from "../manage-plane/services/manage-plane.service";
import { HomeService } from "../../home/services/home.service";

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
              private manageAirlineService: ManageAirlineService,
              private managePlaneService: ManagePlaneService,
              private homeService: HomeService,
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
    this.manageFlightService.addFlight(<Flight>this.sendIt).subscribe(x => console.log('x'));
  }

  editFlight() {

  }

  getFlight(id: string) {
    this.flight$ = this.manageFlightService.getFlight(id);
  }

  airlines: Airline[] = [];
  filteredAirline: Airline[] = [];

  getAirlines(event: any) {
    let filtered: Airline[] = [];
    let query = event.query;
    this.manageAirlineService.getAirlines(query).subscribe(data => {
      this.airlines = data;
    });
    for (let i = 0; i < this.airlines.length; i++) {
      let airline = this.airlines[i];
      // @ts-ignore
      if (airline.company.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(airline);
      }
    }

    this.filteredAirline = filtered;
  }

  ngOnInit(): void {
    this.flights$ = this.manageFlightService.getFlights();

  }

  flightNumber!: string;
  airlineCo!: string[];
  planes!: string[];
  fromCity!: string[];
  toCity!: string[];
  fromAirport!: string[];
  toAirport!: string[];
  departureTime!: Date;
  arrivalTime!: Date;
  results!: string[];

  sendIt = {
    a: this.flightNumber,
    b: this.airlineCo,
    c: this.planes,
    d: this.fromCity,
    e: this.toCity,
    f: this.fromAirport,
    g: this.toAirport,
    h: this.departureTime,
    i: this.arrivalTime,
  }

  chooseAirlines(event: any) {
    this.manageAirlineService.getAirlines(event.query).pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap(data => {
        this.results = data.map(airline => airline.company);
        return this.results;
      })
    ).subscribe();
  }

  choosePlane(event: any) {
    this.managePlaneService.getPlanes(event.query).pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap(data => {
        this.results = data.map(plane => plane.planeCode);
        return this.results;
      })
    ).subscribe();
  }

  chooseDestinations(event: any) {
    this.homeService.getAirports(event.query).pipe(
      debounceTime(300))
      .subscribe(data => {
        this.results = data.map(item => item.city);
      })
  }

  chooseAirport(event: any) {
    this.homeService.getAirports(event.query).pipe(
      debounceTime(300))
      .subscribe(data => {
        this.results = data.map(item => item.name);
      })
  }

  chooseDepartureTime(event: any) {
    this.departureTime = event;
  }

  chooseArrivalTime(event: any) {
    this.arrivalTime = event;
  }

}
