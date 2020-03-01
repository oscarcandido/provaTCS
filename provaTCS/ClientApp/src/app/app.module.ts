import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AppRoutingModule } from './app.routing.module';
import { MaquinaModule } from './maquina/maquina.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatusModule } from './status/status.module';
import { DashboardMaquinasModule } from './DashboardMaquinas/dashboard-maquinas.module';

@NgModule({
  declarations: [
      AppComponent,
      NavMenuComponent,
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      AppRoutingModule,
      ReactiveFormsModule,
      MaquinaModule,
      StatusModule,
      DashboardMaquinasModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
