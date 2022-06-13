import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchComponent } from './search/search.component';
import { SharedModule } from "../shared/shared.module";
import { LayoutComponent } from './layout.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SearchComponent,
    LayoutComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatSliderModule,
    FormsModule
  ]
})
export class LayoutModule {
}
