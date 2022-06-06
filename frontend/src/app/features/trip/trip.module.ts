import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip.component';
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    TripComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: TripComponent},
    ])
  ]
})
export class TripModule {
}
