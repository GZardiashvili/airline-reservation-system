import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightComponent } from "./flight.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { InputNumberModule } from "primeng/inputnumber";


@NgModule({
  declarations: [FlightComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: FlightComponent},
    ]),
    SharedModule,
    FormsModule,
    InputNumberModule
  ]
})
export class FlightModule {
}
