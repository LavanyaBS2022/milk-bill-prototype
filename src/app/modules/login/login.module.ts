import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from "./../../angular.material.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login.routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { VerifyUserEmailComponent } from './components/verify-user-email/verify-user-email.component';
import { SharedModule } from './../../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    LoginRoutingModule,
    SharedModule,
    // AppModule
  ],
  declarations: [ LoginComponent,ForgotpasswordComponent, VerifyUserEmailComponent]
})
export class LoginModule { }
