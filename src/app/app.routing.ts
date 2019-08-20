import { Routes, RouterModule } from '@angular/router';

import { AYHomeComponent } from './ay-home';
import { AYLoginComponent } from './ay-login';
import { AYRegisterComponent } from './ay-register';
import { AuthGuard } from './ay-helpers';
import { AYCreateQuestionComponent } from "./ay-datacapture/ay-question/create-ay-question.component";
import { AYPreviewQuestionComponent } from './ay-datacapture/ay-question/preview-ay-question.component';

const routes: Routes = [
    { path: '', component: AYHomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: AYLoginComponent },
    { path: 'register', component: AYRegisterComponent },
    { path: 'home', component: AYHomeComponent, canActivate: [AuthGuard] },
    { path: 'createquestion', component : AYCreateQuestionComponent, canActivate: [AuthGuard]},
    { path: 'previewquestion/:id', component : AYPreviewQuestionComponent, canActivate: [AuthGuard]},
    { path: 'editquestion/:id', component : AYCreateQuestionComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'});