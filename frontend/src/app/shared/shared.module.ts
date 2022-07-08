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
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { FileUploadModule } from "primeng/fileupload";
import { TableModule } from "primeng/table";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextareaModule } from "primeng/inputtextarea";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { SelectButtonModule } from "primeng/selectbutton";

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
  DataViewModule,
  PanelModule,
  DialogModule,
  ButtonModule,
  RippleModule,
  RatingModule,
  ConfirmDialogModule,
  ToastModule,
  ToolbarModule,
  FileUploadModule,
  TableModule,
  RadioButtonModule,
  InputNumberModule,
  InputTextareaModule,
  CascadeSelectModule,
  SelectButtonModule,
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
