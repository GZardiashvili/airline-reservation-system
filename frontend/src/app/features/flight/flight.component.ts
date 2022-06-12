import { Component, OnInit } from '@angular/core';
import { faHeart } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {
  faHeart = faHeart

  constructor() {
  }

  ngOnInit(): void {
  }

}
