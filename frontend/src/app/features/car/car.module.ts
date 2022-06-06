import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from "./car.component";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [CarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: CarComponent},
    ])
  ]
})
export class CarModule {
}
