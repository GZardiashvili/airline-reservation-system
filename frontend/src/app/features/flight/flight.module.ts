import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightComponent } from "./flight.component";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [FlightComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: FlightComponent},
    ])
  ]
})
export class FlightModule {
}
