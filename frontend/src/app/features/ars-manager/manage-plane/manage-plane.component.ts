import { Component, OnInit } from '@angular/core';
import { ManagePlaneService } from "./services/manage-plane.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-manage-plane',
  templateUrl: './manage-plane.component.html',
  styleUrls: ['./manage-plane.component.scss']
})
export class ManagePlaneComponent implements OnInit {

  planes$!: Observable<any[]>;
  status = ['All'];

  constructor(private managePlaneService: ManagePlaneService) {
  }

  ngOnInit(): void {
    this.planes$ = this.managePlaneService.getPLanes();
  }

}
