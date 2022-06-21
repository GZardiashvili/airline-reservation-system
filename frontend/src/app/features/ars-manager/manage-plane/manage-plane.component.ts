import { Component, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-manage-plane',
  templateUrl: './manage-plane.component.html',
  styleUrls: ['./manage-plane.component.scss']
})
export class ManagePlaneComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadPlanes$ = new BehaviorSubject(true);
  planes$!: Observable<Plane[]>;
  status = ['All'];

  planeForm = this.fb.group({
    airlineId: [''],
    model: [''],
    seats: [''],
  });

  constructor(private managePlaneService: ManagePlaneService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.planes$ = combineLatest([
      this.route.paramMap,
      this.commonService.getSearchTerm().pipe(
        takeUntil(this.componentIsDestroyed$),
        debounceTime(300),
        distinctUntilChanged(),
      ),
      this.reloadPlanes$,
    ]).pipe(
      switchMap(([params]) => {
        return this.managePlaneService.getPlanes();
      })
    );
  }

  addPlane() {
    return this.managePlaneService.addPlane(<Plane>this.planeForm.value)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(
        () => this.reloadPlanes()
      )
  }

  private reloadPlanes(): void {
    this.reloadPlanes$.next(true);
  }

  ngOnDestroy(): void {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}

