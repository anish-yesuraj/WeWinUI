import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { AYLeftComponent } from './ay-left/ay-left.component';
import { AYHeadComponent } from './ay-head/ay-head.component';
import { AYFootComponent } from './ay-foot/ay-foot.component';
import { MatCardModule } from '@angular/material';

@NgModule({
    declarations: [
      AYLeftComponent,
      AYHeadComponent,
      AYFootComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule,
        MatCardModule
    ],
    exports: [
      AYLeftComponent,
      AYHeadComponent,
      AYFootComponent,
      MatCardModule
    ]
  })
  export class AYLayoutModule { }
  