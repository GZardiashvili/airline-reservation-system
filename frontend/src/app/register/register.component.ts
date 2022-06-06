import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from "rxjs/operators";
import { Router } from "@angular/router";
import { SignupService } from "./services/signup.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private componentIsDestroyed$ = new Subject<boolean>();
  signupClicked = false;
  faExclamationCircle: IconProp = faExclamationCircle;
  type = {
    label: 'show',
    type: 'password'
  }

  months = [
    'January',
    'February',]
  years = [
    '2020',
    '2021',
    '2022',]
  days = [
    '1',
    '2',
    '3',
    '4',]

  signUpFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    // confirmPasswordControl: new FormControl(''),
    // genderControl: new FormControl(''),
    // monthControl: new FormControl(''),
    // dayControl: new FormControl(''),
    // yearControl: new FormControl(''),
    // phoneControl: new FormControl(''),
    // countryControl: new FormControl(''),
    // stateControl: new FormControl(''),
    // cityControl: new FormControl(''),
  })

  constructor(private signupService: SignupService,
              private router: Router) {
  }

  signUp() {
    if (this.signUpFormGroup.invalid) {
      this.signupClicked = true;
    }
    if (this.signUpFormGroup.valid) {
      this.signupService
        .signup(
          this.signUpFormGroup.value
        )
        .pipe(takeUntil(this.componentIsDestroyed$))
        .subscribe(
          () => {
            this.router.navigate(['/']);
          },
          (error: Error) => {
            console.error(error);
          }
        );
    }
  }

  showHide() {
    if (this.type.type === 'password') {
      this.type.label = 'hide';
      this.type.type = 'text';
    } else {
      this.type.label = 'show';
      this.type.type = 'password';
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
