import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AYQuestionComponent } from './ay-question/ay-question.component';

const routes: Routes = [
  { path: '', component: AYQuestionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AYDataCaptureRoutingModule { }
