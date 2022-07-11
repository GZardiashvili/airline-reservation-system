import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";
import { ManageUserService } from "./services/manage-user.service";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CommonService } from "../../../shared/common/common.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { takeUntil } from "rxjs/operators";
import { User } from "./user";
import { Table } from "primeng/table";

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();
  private readonly reloadUsers$ = new BehaviorSubject(true);
  users!: User[];
  user!: User;
  status = ['All', 'Active', 'Inactive', 'admin'];
  headers = ['Name', 'Email'];
  permission!: string;
  roles = [{permission: 'user'}, {permission: 'admin'}];
  productDialog!: boolean;

  selectedUsers!: any[] | null;


  submitted!: boolean;
  Delete: any;

  constructor(private manageUserService: ManageUserService, private fb: FormBuilder,
              private route: ActivatedRoute,
              private commonService: CommonService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.manageUserService.getUsers().subscribe(users => {
      this.users = users;
    })
  }

  addUser() {
    return this.manageUserService.addUser(this.user)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(
        () => this.reloadUsers()
      )
  }

  updateUser(id: string | undefined) {
    return this.manageUserService.updateUser(String(id), this.user)
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(
        () => this.reloadUsers()
      )
  }

  openNew() {
    this.user = {city: "", country: "", email: "", firstName: "", lastName: "", phone: "", role: ""};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected airlines?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter(val => !this.selectedUsers?.includes(val));
        this.selectedUsers = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Airlines Deleted', life: 3000});
      }
    });
  }

  editProduct(user: User) {
    this.user = {...user};
    this.productDialog = true;
    this.permission = this.user.role;
  }

  deleteProduct(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.firstName + user.lastName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.deleteUser(airline._id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Airline Deleted', life: 3000});
      }
    });
  }

  @ViewChild('dt') dt!: Table;

  applyFilterGlobal($event: Event, contains: string) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, contains);
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.user.firstName?.trim()) {
      if (this.user._id) {
        this.users[this.findIndexById(this.user._id)] = this.user;
        this.updateUser(this.user._id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Airline Updated', life: 3000});
      } else {
        this.addUser()
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Airline Created', life: 3000});
      }

      this.users = [...this.users];
      this.productDialog = false;
      this.user = {city: "", country: "", email: "", firstName: "", lastName: "", phone: "", role: ""};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  private reloadUsers(): void {
    this.reloadUsers$.next(true);
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
