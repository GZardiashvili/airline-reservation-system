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

@Component({
  selector: 'app-manage-airline',
  templateUrl: './manage-airline.component.html',
  styleUrls: ['./manage-airline.component.scss']
})
export class ManageAirlineComponent implements OnInit, OnDestroy {

  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadAirlines$ = new BehaviorSubject(true);
  airlines$!: Observable<Airline[]>;
  airline$!: Observable<Airline>;
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

  constructor(private manageAirlineService: ManageAirlineService,
              private manageFlightService: ManageFlightService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private commonService: CommonService) {

  }

  editView() {
    this.view = 'edit';
  }

  showDetails() {
    this.view = 'details';
  }

  createView() {
    this.view = 'create';
  }

  ngOnInit(): void {
    this.airlines$ = combineLatest([
      this.route.paramMap,
      this.commonService.getUpdate().pipe(
        takeUntil(this.componentIsDestroyed$),
        debounceTime(300),
        distinctUntilChanged(),
      ),
      this.reloadAirlines$,
    ]).pipe(
      switchMap(([params]) => {
        return this.manageAirlineService.getAirlines();
      })
    );
    this.flights$ = this.manageFlightService.getFlights();
  }

  addAirline() {
    return this.manageAirlineService.addAirline(<Airline>this.airlineForm.value)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(
        () => this.reloadAirlines()
      )
  }

  getAirline(id: string) {
    this.airline$ = this.manageAirlineService.getAirline(id);
    this.airline$.pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(airline => {
        this.airlineForm.patchValue(airline);
      })
  }

  updateAirline(id: string | undefined) {
    return this.manageAirlineService.updateAirline(String(id), <Airline>this.airlineForm.value)
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

  private reloadAirlines(): void {
    this.reloadAirlines$.next(true);
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
