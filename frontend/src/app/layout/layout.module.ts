import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchComponent } from './search/search.component';
import { SharedModule } from "../shared/shared.module";
import { LayoutComponent } from './layout.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatMenuModule } from "@angular/material/menu";
import { SubMenuComponent } from './header/sub-menu/sub-menu.component';
import { UserDialogComponent } from './header/user-dialog/user-dialog.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SearchComponent,
    LayoutComponent,
    SubMenuComponent,
    UserDialogComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
  ]
})
export class LayoutModule {
}
