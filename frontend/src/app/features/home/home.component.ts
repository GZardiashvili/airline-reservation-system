import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { debounceTime, map, Observable, startWith } from "rxjs";
import { faPlaneArrival, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { HomeService } from "./services/home.service";
import { Location } from "./location";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  fromCityControl = new FormControl('');
  toCityControl = new FormControl('');
  locations$!: Observable<Location[]>;
  faPlaneDeparture = faPlaneDeparture
  faPlaneArrival = faPlaneArrival

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.fromCityControl.valueChanges.pipe(
      debounceTime(300),
    ).subscribe(value => {
        this.locations$ = this.homeService.getLocations(String(value));
      }
    );
    this.toCityControl.valueChanges.pipe(
      debounceTime(300),
    ).subscribe(value => {
        this.locations$ = this.homeService.getLocations(String(value));
      }
    );
  }
}
