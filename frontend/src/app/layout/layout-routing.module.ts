import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
      path: 'flights',
      loadChildren: () =>
        import('../features/flight/flight.module').then(
          (m) => m.FlightModule
        ),
    },
    {
      path: 'hotels',
      loadChildren: () =>
        import('../features/hotel/hotel.module').then(
          (m) => m.HotelModule
        ),
    },
    {
      path: 'cars',
      loadChildren: () =>
        import('../features/car/car.module').then(
          (m) => m.CarModule
        ),
    },
    {
      path: 'activities',
      loadChildren: () =>
        import('../features/activity/activity.module').then(
          (m) => m.ActivityModule
        ),
    },
    {
      path: 'explore',
      loadChildren: () =>
        import('../features/explore/explore.module').then(
          (m) => m.ExploreModule
        ),
    },
    {
      path: 'trips',
      loadChildren: () =>
        import('../features/trip/trip.module').then(
          (m) => m.TripModule
        ),
    }
  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
