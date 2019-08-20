import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { appRoutingModule } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AYCustomModule } from './app.module.ay-custom';

import { AYDataService } from './ay-service/ay-data.service';

import { AppComponent } from './app.component';
import { AYLoginComponent } from './ay-login';
import { AYRegisterComponent } from './ay-register';
import { AYHomeComponent } from './ay-home';
import { AYAlertComponent } from './ay-error';
import { AYCreateQuestionComponent } from "./ay-datacapture/ay-question/create-ay-question.component";
import { AYPreviewQuestionComponent } from "./ay-datacapture/ay-question/preview-ay-question.component";
import { AYAnswerChoiceDialog } from './ay-datacapture/ay-answer/ay-answer-choice-dialog.component';

import { httpJwtInterceptorProviders, httpErrorInterceptorProviders } from './ay-helpers';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AYNavService } from './ay-service';


@NgModule({
  declarations: [
    AppComponent,
    AYHomeComponent,
    AYLoginComponent,
    AYRegisterComponent,
    AYAlertComponent,
    AYCreateQuestionComponent,
    AYAnswerChoiceDialog,
    AYPreviewQuestionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    appRoutingModule,
    AYCustomModule
  ],
  entryComponents: [AYAnswerChoiceDialog],
  providers: [
      httpJwtInterceptorProviders,
      httpErrorInterceptorProviders,
      AYDataService,
      AYNavService,
      { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
