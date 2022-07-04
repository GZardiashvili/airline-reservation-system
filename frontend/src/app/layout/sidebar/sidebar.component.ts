import { Component } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormBuilder } from "@angular/forms";
import { Profile } from "../header/models/profile";
import { CommonService } from "../../shared/common/common.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  currentRoute: string = '/';
  priceRangeFormGroup = this.formBuilder.group({
    priceRangeControl: ['']
  });

  flightClass = {
    type: 'All',
    completed: false,
    color: 'primary',
    classItem: [
      {type: 'Economy', completed: false, color: 'accent'},
      {type: 'Premium', completed: false, color: 'accent'},
      {type: 'Business', completed: false, color: 'accent'},
      {type: 'First', completed: false, color: 'accent'},
    ],
  };

  airline = {
    type: 'All',
    completed: false,
    color: 'primary',
    classItem: [
      {type: 'Ar1', completed: false, color: 'accent'},
      {type: 'AR2', completed: false, color: 'accent'},
      {type: 'AR3', completed: false, color: 'accent'},
    ],
  };
  orderBy = [
    {value: 'best_match', viewValue: 'Best match'},
    {value: 'priceLow', viewValue: 'Price: lowest first'},
    {value: 'priceHigh', viewValue: 'Price: highest first'},
    {value: 'duration', viewValue: 'Duration'},
  ];

  constructor(private router: Router, private formBuilder: FormBuilder, private commonService: CommonService) {
    router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });

  }

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.flightClass.classItem != null && this.flightClass.classItem.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.flightClass.classItem == null) {
      return false;
    }
    this.commonService.sendUpdate(this.flightClass.classItem.filter(t => t.completed).length > 0 && !this.allComplete);
    return this.flightClass.classItem.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.flightClass.classItem == null) {
      return;
    }
    this.flightClass.classItem.forEach(t => (t.completed = completed));
  }

  formatLabel(value: number) {
    if (value >= 5000) {
      return Math.round(value / 5000) + '$';
    }

    return value;
  }

}
