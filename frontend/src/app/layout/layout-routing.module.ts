import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    }
  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
