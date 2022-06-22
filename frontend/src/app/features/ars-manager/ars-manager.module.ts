import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArsManagerComponent } from './ars-manager.component';
import { RouterModule } from "@angular/router";
import { ManageAirlineComponent } from './manage-airline/manage-airline.component';
import { ManageFlightComponent } from './manage-flight/manage-flight.component';
import { ManageTicketComponent } from './manage-ticket/manage-ticket.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManagePlaneComponent } from './manage-plane/manage-plane.component';
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    ArsManagerComponent,
    ManageAirlineComponent,
    ManageFlightComponent,
    ManageTicketComponent,
    ManageUserComponent,
    ManagePlaneComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: ArsManagerComponent},
      {path: 'airlines', component: ManageAirlineComponent},
      {path: 'manage-flights', component: ManageFlightComponent},
      {path: 'tickets', component: ManageTicketComponent},
      {path: 'users', component: ManageUserComponent},
      {path: 'planes', component: ManagePlaneComponent}
    ]),
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ArsManagerModule {
}
