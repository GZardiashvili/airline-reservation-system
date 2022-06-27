import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BookedComponent } from "./booked.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: BookedComponent},
    ]),
  ]
})
export class BookedModule {
}
