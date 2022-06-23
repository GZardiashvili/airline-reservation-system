import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { User } from "../../../register/user";
import { ManageUserService } from "./services/manage-user.service";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CommonService } from "../../../shared/common/common.service";

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  users$!: Observable<User[]>;
  status = ['All', 'Active', 'Inactive', 'admin'];
  headers = ['Name', 'Email', 'Status'];

  constructor(private manageUserService: ManageUserService, private fb: FormBuilder,
              private route: ActivatedRoute,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.users$ = this.manageUserService.getUsers();

  }

}
