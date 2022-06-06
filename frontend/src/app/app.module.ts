import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from "./auth/auth.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RegisterComponent } from "./register/register.component";
import { SharedModule } from "./shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { FlightComponent } from './features/flight/flight.component';
import { HotelComponent } from './features/hotel/hotel.component';
import { CarComponent } from './features/car/car.component';
import { ActivityComponent } from './features/activity/activity.component';
import { ExploreComponent } from './features/explore/explore.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    FlightComponent,
    HotelComponent,
    CarComponent,
    ActivityComponent,
    ExploreComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
