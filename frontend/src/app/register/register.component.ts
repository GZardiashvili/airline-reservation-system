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
  currentView: 'login' | 'signup' = 'signup';
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
    firstNameControl: new FormControl('', [Validators.required]),
    lastNameControl: new FormControl('', [Validators.required]),
    emailControl: new FormControl('', [Validators.required, Validators.email]),
    passwordControl: new FormControl('', [Validators.required]),
    confirmPasswordControl: new FormControl('', [Validators.required]),
    genderControl: new FormControl(''),
    monthControl: new FormControl('', [Validators.required]),
    dayControl: new FormControl('', [Validators.required]),
    yearControl: new FormControl('', [Validators.required]),
    phoneControl: new FormControl(''),
    countryControl: new FormControl(''),
    stateControl: new FormControl(''),
    cityControl: new FormControl(''),
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

  goToLogin() {
    this.currentView = "login";
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }
}
