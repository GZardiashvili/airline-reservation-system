import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ManagePlaneService } from "./services/manage-plane.service";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap
} from "rxjs";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CommonService } from "../../../shared/common/common.service";
import { takeUntil } from "rxjs/operators";
import { Plane } from "./plane";
import { Airline } from "../manage-airline/airline";
import { ConfirmationService, MessageService } from "primeng/api";
import { Table } from "primeng/table";

@Component({
  selector: 'app-manage-plane',
  templateUrl: './manage-plane.component.html',
  styleUrls: ['./manage-plane.component.scss']
})
export class ManagePlaneComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadPlanes$ = new BehaviorSubject(true);
  planes!: Plane[];
  plane!: Plane;
  status = ['All', 'Commercial', 'Business'];
  headers = ['Airline', 'Model'];
  view: 'details' | 'edit' | 'create' | 'none' = 'none';
  productDialog!: boolean;

  selectedProducts!: any[] | null;

  submitted!: boolean;
  Delete: any;

  planeForm = this.fb.group({
    airlineId: [''],
    model: [''],
    planeCode: [''],
    seats: [''],
  });

  constructor(private managePlaneService: ManagePlaneService,
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
      this.reloadPlanes$,
    ]).pipe(
      switchMap(([params]) => {
        return this.managePlaneService.getPlanes('');
      })
    ).subscribe(
      (planes: Plane[]) => {
        this.planes = planes;
      }
    );
  }

  addPlane() {
    return this.managePlaneService.addPlane(this.plane)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(
        () => this.reloadPlanes()
      )
  }

  getPlane(id: string) {
    this.managePlaneService.getPlane(id).subscribe(
      (plane: Plane) => {
        this.plane = plane;
      }
    )
  }

  updatePlane(id: string | undefined) {
    return this.managePlaneService.updatePlane(String(id), this.plane)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(
        () => this.reloadPlanes()
      )
  }

  deletePlane(id: string | undefined) {
    return this.managePlaneService.deletePlane(String(id))
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(
        () => this.reloadPlanes()
      )
  }

  openNew() {
    this.plane = {airlineId: "", model: "", planeCode: "", seats: 0};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected airlines?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.planes = this.planes.filter(val => !this.selectedProducts?.includes(val));
        this.selectedProducts = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Airlines Deleted', life: 3000});
      }
    });
  }

  @ViewChild('dt') dt!: Table;

  applyFilterGlobal($event: Event, contains: string) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, contains);
  }

  editProduct(plane: Plane) {
    this.plane = {...plane};
    this.productDialog = true;
  }

  deleteProduct(airline: Airline) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + airline.company + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletePlane(airline._id);
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

    if (this.plane.model.trim()) {
      if (this.plane._id) {
        this.planes[this.findIndexById(this.plane._id)] = this.plane;
        this.updatePlane(this.plane._id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Airline Updated', life: 3000});
      } else {
        this.addPlane();
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Airline Created', life: 3000});
      }

      this.planes = [...this.planes];
      this.productDialog = false;
      this.plane = {airlineId: "", model: "", planeCode: "", seats: 0};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.planes.length; i++) {
      if (this.planes[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  private reloadPlanes(): void {
    this.reloadPlanes$.next(true);
  }

  ngOnDestroy(): void {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}

