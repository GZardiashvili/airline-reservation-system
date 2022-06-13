import { Component } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormBuilder } from "@angular/forms";

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
    if (value >= 1000) {
      return Math.round(value / 1000) + '$';
    }

    return value;
  }

}
