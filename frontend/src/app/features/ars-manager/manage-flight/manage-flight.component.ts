import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
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
import { ConfirmationService, MessageService } from "primeng/api";
import { Table } from "primeng/table";

@Component({
  selector: 'app-manage-flight',
  templateUrl: './manage-flight.component.html',
  styleUrls: ['./manage-flight.component.scss']
})
export class ManageFlightComponent implements OnInit, OnDestroy {
  private readonly reloadFlights$ = new BehaviorSubject(true);
  private componentIsDestroyed$ = new Subject<boolean>();
  flights!: Flight[];
  flight!: Flight;
  tickets: any[] = [];
  airlines: Airline[] = [];
  filteredAirline: Airline[] = [];

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
  productDialog!: boolean;
  selectedProducts!: Flight[] | null;
  submitted!: boolean;

  constructor(private manageFlightService: ManageFlightService,
              private manageAirlineService: ManageAirlineService,
              private managePlaneService: ManagePlaneService,
              private homeService: HomeService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private commonService: CommonService) {
  }

  editFlight() {

  }

  getFlight(id: string) {
    this.manageFlightService.getFlight(id).subscribe(data => {
      this.flight = data;
    });
  }


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
    combineLatest(
      [
        this.route.paramMap,
        this.reloadFlights$
      ]
    ).pipe(
      switchMap(([params]) => {
        return this.manageFlightService.getFlights();
      }),
    ).subscribe(data => {
      this.flights = data;
    })

  }

  flightObj = {
    flightNumber: '',
    airlineId: [],
    planeId: [],
    ticketId: [],
    departureCity: [],
    arrivalCity: [],
    departureAirport: [],
    arrivalAirport: [],
    departureTime: '',
    arrivalTime: '',
    results: [''],
  }
  Delete: any;

  addFlight() {
    this.manageFlightService.addFlight(<any>this.flightObj)
      .pipe(takeUntil(this.componentIsDestroyed$),)
      .subscribe(() => this.reloadFlights());
    this.flightObj = {
      flightNumber: '',
      airlineId: [],
      planeId: [],
      ticketId: [],
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

  openNew() {
    this.flight = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.flights = this.flights.filter(val => !this.selectedProducts?.includes(val));
        this.selectedProducts = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
    });
  }

  editProduct(flight: Flight) {
    this.flight = {...flight};
    this.productDialog = true;
  }

  deleteProduct(flight: Flight) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + flight.flightNumber + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.flights = this.flights.filter(val => val._id !== flight._id);
        this.flight = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.flight.flightNumber?.trim()) {
      if (this.flight._id) {
        this.flights[this.findIndexById(this.flight._id)] = this.flight;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      } else {
        this.flight._id = this.createId();
        this.flights.push(this.flight);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }

      this.flights = [...this.flights];
      this.productDialog = false;
      this.flight = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.flights.length; i++) {
      if (this.flights[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  private reloadFlights(): void {
    this.reloadFlights$.next(true);
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  @ViewChild('dt') dt!: Table;

  applyFilterGlobal($event: Event, contains: string) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, contains);
  }
}
