import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AYLoginComponent } from './ay-login.component';

const routes: Routes = [
  { path: '', component: AYLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AYLoginRoutingModule { }
