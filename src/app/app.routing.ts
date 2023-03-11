import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    AdminLayoutComponent,
    FullLayoutComponent,
    SimpleLayoutComponent
} from './containers';
import { LoginComponent } from './modules/login/pages/login/login.component';
import { P403Component } from './shared/components/error/403.component';
import { P404Component } from './shared/components/error/404.component';
import { P500Component } from './shared/components/error/500.component';
import { VerifyUserEmailComponent } from './modules/login/components/verify-user-email/verify-user-email.component';
import { ForgotpasswordComponent } from './modules/login/components/forgotpassword/forgotpassword.component';

export const routes: Routes = [
    {
        path: '404',
        component: P404Component,
        data: {
          title: 'Page 404'
        }
    },
    {
        path: '403',
        component: P403Component,
        data: {
            title: 'Page 403'
        }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login Page'
        }
    },
    {
        path: '',
        component: LoginComponent,
        data: {
            title: 'Login Pages'
        }
    },
    {
        path: '',
        component: AdminLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
                // canActivate: [AuthGuardService]
            },
           
           
            {
                path: 'users',
                loadChildren: './modules/users/users.module#UsersModule'
            },
           

            {
                path: 'milk',
                loadChildren: './modules/milk/milk.module#MilkModule',
                // canActivate: [AuthGuardService]
            },
            {
                path: 'milk_reports',
                loadChildren: './modules/milk-reports/milk-reports.module#MilkReportsModule',
                // canActivate: [AuthGuardService]
            },
            {
                path: 'chilling_center',
                loadChildren: './modules/chilling-center/chilling-center.module#ChillingCenterModule',
                // canActivate: [AuthGuardService]
            },
            {
                path: 'farmer',
                loadChildren: './modules/farmer/farmer.module#FarmerModule',
                // canActivate: [AuthGuardService]
            },
        ]
    },
    {
        path:'verify-user-email/:base64Email',
        component: VerifyUserEmailComponent,
        data: {
            title : 'Verify User Email'
        }
    },
    {
        path:'forgot-password',
        component: ForgotpasswordComponent,
        data: {
            title : 'forgot password'
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
