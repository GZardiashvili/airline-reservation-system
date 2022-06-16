import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookFlightComponent } from './book-flight.component';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    BookFlightComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: BookFlightComponent},
    ]),
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class BookFlightModule {
}
