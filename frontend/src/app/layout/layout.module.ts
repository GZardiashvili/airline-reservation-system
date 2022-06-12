import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchComponent } from './search/search.component';
import { SharedModule } from "../shared/shared.module";
import { LayoutComponent } from './layout.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SubHeaderComponent } from './header/sub-header/sub-header.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SearchComponent,
    LayoutComponent,
    SubHeaderComponent,
  ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class LayoutModule { }
