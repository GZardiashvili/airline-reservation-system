import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from "@angular/forms";
import { List } from "./list";
import { faEllipsis, faJetFighter } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
  readonly faDetails = faEllipsis
  readonly faJetFighter: IconProp = faJetFighter

  total = 0;
  totalAmount = [];
  template: FormControl = new FormControl('Select template');
  showError = false;

  @Input() item: List | null = null;
  @Input() filters!: string[] | null;
  @Input() headers!: string[] | null;
  @Output() onClick = new EventEmitter<any>();
  currentStatus: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  filterByStatus(status: string | undefined) {

  }

  filterByDate(date: Date) {

  }
}

