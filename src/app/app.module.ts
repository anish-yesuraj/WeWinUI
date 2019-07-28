import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'
import { FlexLayoutModule } from '@angular/flex-layout'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AYLayoutModule } from './ay-layout/ay-layout.module';
import { AYCustomModule } from './app.module.ay-custom';
import { AYDataService } from './ay-service/ay-data.service';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    FlexLayoutModule,
    AYLayoutModule,
    AYCustomModule
  ],
  providers: [
      AYDataService,
      {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
    ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
