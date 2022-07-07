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
import { ManageAirlineService } from "./services/manage-airline.service";
import { FormBuilder, } from "@angular/forms";
import { Flight } from "../../flight/flight";
import { ManageFlightService } from "../manage-flight/services/manage-flight.service";
import { Airline } from "./airline";
import { takeUntil } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { CommonService } from "../../../shared/common/common.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: 'app-manage-airline',
  templateUrl: './manage-airline.component.html',
  styleUrls: ['./manage-airline.component.scss']
})
export class ManageAirlineComponent implements OnInit, OnDestroy {

  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadAirlines$ = new BehaviorSubject(true);
  airlines!: Airline[];
  airline!: Airline;
  status = ['All', 'Commercial', 'Business'];
  headers = ['Company', 'Code'];
  view: 'details' | 'edit' | 'create' | 'none' = 'none';

  flights$!: Observable<Flight[]>;
  airlineForm = this.fb.group({
    company: [''],
    airlineCode: [''],
    airlineDescription: [''],
    flightId: [''],
  });
  productDialog!: boolean;

  selectedProducts!: any[] | null;

  submitted!: boolean;
  Delete: any;

  constructor(private manageAirlineService: ManageAirlineService,
              private manageFlightService: ManageFlightService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private commonService: CommonService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {

  }


  ngOnInit(): void {
    combineLatest([
      this.route.paramMap,
      this.commonService.getUpdate().pipe(
        takeUntil(this.componentIsDestroyed$),
        debounceTime(300),
        distinctUntilChanged(),
      ),
      this.reloadAirlines$,
    ]).pipe(
      switchMap(([params]) => {
        return this.manageAirlineService.getAirlines('');
      })
    ).subscribe(
      (airlines: Airline[]) => {
        this.airlines = airlines;
      }
    );
    this.flights$ = this.manageFlightService.getFlights();
  }

  addAirline() {
    return this.manageAirlineService.addAirline(this.airline)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(
        () => this.reloadAirlines()
      )
  }

  updateAirline(id: string | undefined) {
    return this.manageAirlineService.updateAirline(String(id), this.airline)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(
        () => this.reloadAirlines()
      )
  }

  deleteAirline(id: string | undefined) {
    return this.manageAirlineService.deleteAirline(String(id))
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(
        () => this.reloadAirlines()
      )
  }

  openNew() {
    this.airline = {airlineCode: "", company: "", description: "", flightIds: []};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected airlines?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.airlines = this.airlines.filter(val => !this.selectedProducts?.includes(val));
        this.selectedProducts = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Airlines Deleted', life: 3000});
      }
    });
  }

  editProduct(airline: Airline) {
    this.airline = {...airline};
    this.productDialog = true;
  }

  deleteProduct(airline: Airline) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + airline.company + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteAirline(airline._id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Airline Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.airline.company.trim()) {
      if (this.airline._id) {
        this.airlines[this.findIndexById(this.airline._id)] = this.airline;
        this.updateAirline(this.airline._id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Airline Updated', life: 3000});
      } else {
        this.addAirline()
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Airline Created', life: 3000});
      }

      this.airlines = [...this.airlines];
      this.productDialog = false;
      this.airline = {airlineCode: "", company: "", description: "", flightIds: []};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.airlines.length; i++) {
      if (this.airlines[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  private reloadAirlines(): void {
    this.reloadAirlines$.next(true);
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
