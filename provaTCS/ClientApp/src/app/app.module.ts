import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppRoutingModule } from './app.routing.module';
import { MaquinaModule } from './maquina/maquina.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatusModule } from './status/status.module';

@NgModule({
  declarations: [
      AppComponent,
      NavMenuComponent,
      HomeComponent,
      CounterComponent,
      FetchDataComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      AppRoutingModule,
      MaquinaModule,
      ReactiveFormsModule,
      StatusModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
