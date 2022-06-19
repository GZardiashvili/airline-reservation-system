import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map, Observable, startWith } from "rxjs";
import { ManageAirlineService } from "./services/manage-airline.service";
import { FormBuilder, FormControl } from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { Flight } from "../../flight/flight";
import { ManageFlightService } from "../manage-flight/services/manage-flight.service";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

@Component({
  selector: 'app-manage-airline',
  templateUrl: './manage-airline.component.html',
  styleUrls: ['./manage-airline.component.scss']
})
export class ManageAirlineComponent implements OnInit {

  airlines$!: Observable<any[]>;
  flights$!: Observable<Flight[]>;
  airlineFormGroup = this.fb.group({
    name: [''],
    airlineCode: [''],
    airlineLogo: [''],
    airlineDescription: [''],
    flightId: [''],
  });

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  constructor(private manageAirlineService: ManageAirlineService, private manageFlightService: ManageFlightService, private fb: FormBuilder) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.airlines$ = this.manageAirlineService.getAirlines();
    this.flights$ = this.manageFlightService.getFlights();
  }

  addAirline() {
    console.log(this.airlineFormGroup.value);
    return this.manageAirlineService.addAirline(this.airlineFormGroup.value);
  }
}
