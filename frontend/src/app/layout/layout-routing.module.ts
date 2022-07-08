import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../auth/guards/auth.guard";
import { AdminGuard } from "../auth/guards/admin.guard";

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
      path: 'home',
      loadChildren: () =>
        import('../features/home/home.module').then(
          (m) => m.HomeModule
        ),
    },
    {
      path: 'flights',
      loadChildren: () =>
        import('../features/flight/flight.module').then(
          (m) => m.FlightModule
        ),
    },
    {
      path: 'book-flight',
      loadChildren: () =>
        import('../features/book-flight/book-flight.module').then(
          (m) => m.BookFlightModule
        ),
      canActivate: [AuthGuard],
    },
    {
      path: 'booked-flights',
      loadChildren: () =>
        import('../features/booked/booked.module').then(
          (m) => m.BookedModule
        ),
    },
    {
      path: 'ars-manager',
      loadChildren: () =>
        import('../features/ars-manager/ars-manager.module').then(
          (m) => m.ArsManagerModule
        ),
      canActivate: [AuthGuard, AdminGuard],
    }
  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
