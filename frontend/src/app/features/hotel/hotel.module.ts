import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponent } from "./hotel.component";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [HotelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: HotelComponent},
    ])
  ]
})
export class HotelModule {
}
