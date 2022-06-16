import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArsManagerComponent } from './ars-manager.component';
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [
    ArsManagerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ArsManagerComponent},
    ]),
  ]
})
export class ArsManagerModule {
}
