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
  mode: 'registerStep1' | 'registerStep2' = 'registerStep1';
  months = [
    {
      value: '0',
      label: 'January'
    },
    {
      value: '1',
      label: 'February'
    },
    {
      value: '2',
      label: 'March'
    },
    {
      value: '3',
      label: 'April'
    },
    {
      value: '4',
      label: 'May'
    },
    {
      value: '5',
      label: 'June'
    },
    {
      value: '6',
      label: 'July'
    },
    {
      value: '7',
      label: 'August'
    },
    {
      value: '8',
      label: 'September'
    },
    {
      value: '9',
      label: 'October'
    },
    {
      value: '10',
      label: 'November'
    },
    {
      value: '11',
      label: 'December'
    }
  ]
  years = [
    '2020',
    '2021',
    '2022',
  ]
  days = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',]
  countries = [
    {
      value: '0',
      label: 'Afghanistan'
    },
    {
      value: '1',
      label: 'Albania'
    }
  ];
  states = [{
    value: '0',
    label: 'Alabama'
  },
    {
      value: '1',
      label: 'Alaska'
    },
  ];
  cities = [
    {
      value: '0',
      label: 'New York'
    },
    {
      value: '1',
      label: 'Los Angeles'
    }
  ];
  signUpFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPasswordControl: new FormControl('', [Validators.required]),
    // genderControl: new FormControl(''),
    monthControl: new FormControl(),
    dayControl: new FormControl(''),
    yearControl: new FormControl(''),
    phoneControl: new FormControl(''),
    countryControl: new FormControl(''),
    stateControl: new FormControl(''),
    cityControl: new FormControl(''),
  })

  constructor(private signupService: SignupService,
              private router: Router) {
  }

  signUp() {
    if (this.mode === 'registerStep1') {
      this.mode = 'registerStep2';
    } else {
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
