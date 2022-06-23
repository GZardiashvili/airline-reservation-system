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
import { takeUntil, tap } from "rxjs/operators";
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
  status = ['All', 'Commercial', 'Business'];
  headers = ['Company', 'Code'];
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

  ngOnInit(): void {
    this.airlines$ = combineLatest([
      this.route.paramMap,
      this.commonService.getSearchTerm().pipe(
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

  private reloadAirlines(): void {
    this.reloadAirlines$.next(true);
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
