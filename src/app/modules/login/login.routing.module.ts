import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { VerifyUserEmailComponent } from './components/verify-user-email/verify-user-email.component';
const loginRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotpasswordComponent },
    { path: 'verify-user-email/:base64Email', component: VerifyUserEmailComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(loginRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class LoginRoutingModule { }