import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from "./explore.component";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [ExploreComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ExploreComponent},
    ])
  ]
})
export class ExploreModule {
}
