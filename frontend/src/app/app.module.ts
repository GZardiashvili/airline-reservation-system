import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from "./auth/auth.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RegisterComponent } from "./register/register.component";
import { SharedModule } from "./shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './features/home/home.component';
import { LayoutModule } from "./layout/layout.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth/interceptors/auth.interceptor";
import { BookedComponent } from './features/booked/booked.component';
import { ConfirmationService, MessageService } from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    BookedComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    ReactiveFormsModule,
    LayoutModule,
    FormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
    MessageService, ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
