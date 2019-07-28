import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path : '',
        redirectTo : '/datacapture',
        pathMatch : 'full'
    },
    {
      path : 'login', 
      loadChildren : './ay-login/ay-login.module#AYLoginModule', 
      data : {showHead : false, showLeft : false}
    },
    {
      path : 'datacapture',
      loadChildren : './ay-datacapture/ay-datacapture.module#AYDataCaptureModule'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
