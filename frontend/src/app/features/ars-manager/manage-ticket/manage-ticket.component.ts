import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CommonService } from "../../../shared/common/common.service";

@Component({
  selector: 'app-manage-ticket',
  templateUrl: './manage-ticket.component.html',
  styleUrls: ['./manage-ticket.component.scss']
})
export class ManageTicketComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
  }

}
