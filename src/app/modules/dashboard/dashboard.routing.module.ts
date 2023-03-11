import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../shared/service/guard/auth-guard.service';

// Import Containers
import {
    AdminLayoutComponent,
    FullLayoutComponent,
    SimpleLayoutComponent
} from '../../containers';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
          module : 'Dashboard',
          permission : ''
        },
        // canActivate: [AuthGuardService]
    }
   
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class DashboardRoutingModule { }
