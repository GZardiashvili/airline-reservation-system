import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSliderModule } from "@angular/material/slider";
import { MatStepperModule } from "@angular/material/stepper";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { RouterModule } from "@angular/router";
import { DetailsComponent } from './components/details/details.component';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";

const materialModules = [
  FontAwesomeModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatCheckboxModule,
  MatSliderModule,
  MatStepperModule,
  MatChipsModule,
  MatIconModule,
];
const primeModules = [
  AutoCompleteModule,
  CalendarModule,
  InputTextModule,
  DropdownModule,
]

@NgModule({
  declarations: [
    AdminListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    ...materialModules,
    ...primeModules,
    RouterModule,
  ],
  exports: [
    ...materialModules,
    ...primeModules,
    AdminListComponent,
    DetailsComponent,
  ],
})
export class SharedModule {
}
