import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import { faPlaneArrival, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {

  fromCityControl = new FormControl('');
  toCityControl = new FormControl('');
  options: string[] = ['USA', 'UK', 'France', 'Germany', 'Italy', 'Spain'];
  filteredOptions: Observable<string[]> | null = null;
  faPlaneDeparture = faPlaneDeparture
  faPlaneArrival = faPlaneArrival

  constructor() {

  }

  ngOnInit(): void {

    this.filteredOptions = this.fromCityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.filteredOptions = this.toCityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
