import { Component } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormBuilder } from "@angular/forms";
import { Profile } from "../header/models/profile";

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
      {type: 'Economy', completed: false, color: 'primary'},
      {type: 'Premium', completed: false, color: 'primary'},
      {type: 'Business', completed: false, color: 'primary'},
      {type: 'First', completed: false, color: 'primary'},
    ],
  };

  airline = {
    type: 'All',
    completed: false,
    color: 'primary',
    classItem: [
      {type: 'Ar1', completed: false, color: 'primary'},
      {type: 'AR2', completed: false, color: 'primary'},
      {type: 'AR3', completed: false, color: 'primary'},
      {type: 'Ar4', completed: false, color: 'primary'},
      {type: 'Ar5', completed: false, color: 'primary'},
      {type: 'Ar6', completed: false, color: 'primary'},
      {type: 'Ar7', completed: false, color: 'primary'},
    ],
  };
  orderBy = [
    {value: 'best_match', viewValue: 'Best match'},
    {value: 'priceLow', viewValue: 'Price: lowest first'},
    {value: 'priceHigh', viewValue: 'Price: highest first'},
    {value: 'duration', viewValue: 'Duration'},
  ];

  constructor(private router: Router, private formBuilder: FormBuilder) {
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
