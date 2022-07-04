import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { debounceTime, map, Observable, startWith } from "rxjs";
import { faPlaneArrival, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { HomeService } from "./services/home.service";
import { Airport } from "./airport";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  fromCityControl = new FormControl('');
  toCityControl = new FormControl('');
  airports$!: Observable<Airport[]>;
  faPlaneDeparture = faPlaneDeparture
  faPlaneArrival = faPlaneArrival

  constructor(private homeService: HomeService, private router: Router) {
  }

  ngOnInit(): void {
    this.fromCityControl.valueChanges.pipe(
      debounceTime(300),
    ).subscribe(value => {
        if (value!.length > 1) {
          this.airports$ = this.homeService.getAirports(String(value));
        }
      }
    );
    this.toCityControl.valueChanges.pipe(
      debounceTime(300),
    ).subscribe(value => {
        if (value!.length > 1) {
          this.airports$ = this.homeService.getAirports(String(value));
        }
      }
    );
  }

  searchFlights() {
    console.log(this.fromCity);
    console.log(this.toCity);
    this.router.navigate(['/flights'], {queryParams: {departureCity: this.fromCity, arrivalCity: this.toCity}});

  }

  fromCity!: string[];
  toCity!: string[];

  results!: string[];

  search(event: any) {
    this.homeService.getAirports(event.query).pipe(
      debounceTime(300))
      .subscribe(data => {
        this.results = data.map(item => item.city);
      })
  }
}
