import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from "rxjs/operators";
import { AuthService } from "../../../auth/services/auth.service";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { MatDialogRef } from "@angular/material/dialog";
import { SignupService } from "../../../register/services/signup.service";
import { CommonService } from "../../../shared/common/common.service";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit, OnDestroy {
  private componentIsDestroyed$ = new Subject<boolean>();

  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  modalView = this.commonService.getUpdate()

  constructor(private authService: AuthService,
              private signupService: SignupService,
              private commonService: CommonService,
              private router: Router,
              private dialogRef: MatDialogRef<UserDialogComponent>) {
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
      setTimeout(() => {
        this.dialogRef.close();
      }, 100);
    }
  }

  login() {
    this.authService.login(this.email, this.password).pipe(takeUntil(this.componentIsDestroyed$)).subscribe(() => {
      setTimeout(() => {
        this.dialogRef.close();
      }, 100);
      window.location.reload();
    });
  }

  signUp() {
    this.signupService
      .signup({firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password})
      .pipe(takeUntil(this.componentIsDestroyed$))
      .subscribe(
        () => {
          setTimeout(() => {
            this.dialogRef.close();
          }, 100);
          this.router.navigate(['/']);
        },
        (error: Error) => {
          console.error(error);
        }
      );

  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

}
