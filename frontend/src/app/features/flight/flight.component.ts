import { Component, OnInit } from '@angular/core';
import { faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {
  faHeart = faHeart
  faLocation = faLocationDot

  constructor() {
  }

  ngOnInit(): void {
  }

}
