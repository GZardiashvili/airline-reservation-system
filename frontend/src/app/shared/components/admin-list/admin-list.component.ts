import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { List } from "./list";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
  statuses = ['All', 'Paid', 'Pending', 'Cancelled'];
  currentStatus = this.statuses[0];
  total = 0;
  totalAmount = [];
  template: FormControl = new FormControl('Select template');
  showError = false;

  @Input() list!: List[] | null;

  constructor() {
  }

  ngOnInit(): void {
  }

  filterByStatus(status: string | undefined) {

  }

  filterByDate(date: Date) {

  }
}
