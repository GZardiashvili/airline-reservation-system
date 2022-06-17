import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ManageAirlineService } from "./services/manage-airline.service";

@Component({
  selector: 'app-manage-airline',
  templateUrl: './manage-airline.component.html',
  styleUrls: ['./manage-airline.component.scss']
})
export class ManageAirlineComponent implements OnInit {

  airlines$!: Observable<any[]>;

  constructor(private manageAirlineService: ManageAirlineService) {

  }

  ngOnInit()
    :
    void {
    this.airlines$ = this.manageAirlineService.getAirlines();
  }

}
