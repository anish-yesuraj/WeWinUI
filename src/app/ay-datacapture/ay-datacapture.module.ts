import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AYDataCaptureRoutingModule } from './ay-datacapture.routing.module';
import { AYQuestionComponent } from './ay-question/ay-question.component';
import { AYAnswerChoiceDialog } from './ay-answer/ay-answer-choice-dialog.component';
import { AYCustomModule } from '../app.module.ay-custom'

@NgModule({
  imports: [
    CommonModule,
    AYDataCaptureRoutingModule,
    AYCustomModule
  ],
  declarations: [
    AYQuestionComponent,
    AYAnswerChoiceDialog
  ],
  entryComponents: [AYAnswerChoiceDialog]
})
export class AYDataCaptureModule { }
