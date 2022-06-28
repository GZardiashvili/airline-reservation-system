import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CommonService } from "../../../shared/common/common.service";
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
import { Ticket } from "./ticket";
import { takeUntil } from "rxjs/operators";
import { ManageTicketService } from "./services/manage-ticket.service";

@Component({
  selector: 'app-manage-ticket',
  templateUrl: './manage-ticket.component.html',
  styleUrls: ['./manage-ticket.component.scss']
})
export class ManageTicketComponent implements OnInit {
  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadTickets$ = new BehaviorSubject(true);
  tickets$!: Observable<Ticket[]>;
  status = ['All'];
  headers = ['Flight', 'User', 'Price'];
  view: 'details' | 'edit' | 'create' | 'none' = 'none';

  flights$!: Observable<Flight[]>;
  ticketForm = this.fb.group({
    flightId: [''],
    userId: [''],
    price: [''],
    status: [''],
  });

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private commonService: CommonService,
              private manageTicketService: ManageTicketService
  ) {
  }

  ngOnInit(): void {
    this.tickets$ = combineLatest([
      this.route.paramMap,
      this.commonService.getSearchTerm().pipe(
        takeUntil(this.componentIsDestroyed$),
        debounceTime(300),
        distinctUntilChanged(),
      ),
      this.reloadTickets$,
    ]).pipe(
      switchMap(([params]) => {
        return this.manageTicketService.getTickets();
      })
    );
  }

  editView() {
    this.view = 'edit';
    this.ticketForm.reset();
  }

  showDetails() {
    this.view = 'details';
  }

  createView() {
    this.view = 'create';
  }

  addTicket() {
    return this.manageTicketService.addTicket(<Ticket>this.ticketForm.value)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(
        () => this.reloadTickets()
      )
  }

  private reloadTickets(): void {
    this.reloadTickets$.next(true);
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
