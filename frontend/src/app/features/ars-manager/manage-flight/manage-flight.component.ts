import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap
} from "rxjs";
import { Flight } from "../../flight/flight";
import { ManageFlightService } from "./services/manage-flight.service";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CommonService } from "../../../shared/common/common.service";
import { ManageAirlineService } from "../manage-airline/services/manage-airline.service";
import { Airline } from "../manage-airline/airline";
import { ManagePlaneService } from "../manage-plane/services/manage-plane.service";
import { HomeService } from "../../home/services/home.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-manage-flight',
  templateUrl: './manage-flight.component.html',
  styleUrls: ['./manage-flight.component.scss']
})
export class ManageFlightComponent implements OnInit, OnDestroy {
  private readonly reloadFlights$ = new BehaviorSubject(true);
  private componentIsDestroyed$ = new Subject<boolean>();
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
      if (airline.company.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(airline);
      }
    }

    this.filteredAirline = filtered;
  }

  ngOnInit(): void {
    this.flights$ = combineLatest(
      [
        this.route.paramMap,
        this.reloadFlights$
      ]
    ).pipe(
      switchMap(([params]) => {
        return this.manageFlightService.getFlights();
      }),
    )

  }

  flightObj = {
    flightNumber: '',
    airlineId: [],
    planeId: [],
    departureCity: [],
    arrivalCity: [],
    departureAirport: [],
    arrivalAirport: [],
    departureTime: '',
    arrivalTime: '',
    results: [''],
  }

  addFlight() {
    this.manageFlightService.addFlight(<any>this.flightObj)
      .pipe(takeUntil(this.componentIsDestroyed$),)
      .subscribe(() => this.reloadFlights());
    this.flightObj = {
      flightNumber: '',
      airlineId: [],
      planeId: [],
      departureCity: [],
      arrivalCity: [],
      departureAirport: [],
      arrivalAirport: [],
      departureTime: '',
      arrivalTime: '',
      results: [''],
    }
  }

  chooseAirlines(event: any) {
    this.manageAirlineService.getAirlines(event.query).pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap(data => {
        this.flightObj.results = data.map(airline => airline.company);
        return this.flightObj.results;
      })
    ).subscribe();
  }

  choosePlane(event: any) {
    this.managePlaneService.getPlanes(event.query).pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap(data => {
        this.flightObj.results = data.map(plane => plane.planeCode);
        return this.flightObj.results;
      })
    ).subscribe();
  }

  chooseDestinations(event: any) {
    this.homeService.getAirports(event.query).pipe(
      debounceTime(300))
      .subscribe(data => {
        this.flightObj.results = data.map(item => item.city);
      })
  }

  chooseAirport(event: any) {
    this.homeService.getAirports(event.query).pipe(
      debounceTime(300))
      .subscribe(data => {
        this.flightObj.results = data.map(item => item.name);
      })
  }

  chooseDepartureTime(event: any) {
    this.flightObj.departureTime = event;
  }

  chooseArrivalTime(event: any) {
    this.flightObj.arrivalTime = event;
  }

  private reloadFlights(): void {
    this.reloadFlights$.next(true);
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
