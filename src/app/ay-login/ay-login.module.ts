import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AYLoginRoutingModule } from './ay-login.routing.module';
import { AYLoginComponent } from './ay-login.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    AYLoginRoutingModule,
    FlexLayoutModule
  ],
  declarations: [AYLoginComponent]
})
export class AYLoginModule { }
