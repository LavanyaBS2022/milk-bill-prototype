import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "./../../shared/login.service";
import { MatDialog } from "@angular/material";
import * as SecureLS from 'secure-ls';
import { Common } from '../../../../shared/service/common/common';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MastersService} from './../../../../shared/service/masters/masters.service';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  componentModel;
  loginView = true;
  private token: string;
  showErrorMessage: boolean = false;
  
  public submitted: boolean = true;
  public isSubmit : boolean = false;
  public loginForm: FormGroup;
  private SecureLS : any;
  public emailValidated: boolean = false;
  public checkOtp: boolean = false;
  public curEmail;
  
  constructor(
      private loginService: LoginService,
      private router: Router,
      private toastr: ToastrService,
      private dialog: MatDialog,
      public common: Common,
      public mastersService:MastersService
  ) {
      this.componentModel = {
          email: "",
          password: ""
      };
  }

  ngOnInit() {
      // sessionStorage.clear();
      // this.common.openSnackBar('Username and password incorrect!!!', '', 'danger-snackbar')
      this.createLoginForm();
      
  }

  get formData() {
      return this.loginForm.controls;
  }

  // initialize the Filter Form
  public createLoginForm() {
      this.loginForm = new FormGroup({
          email : new FormControl({ disabled: false, value: '' }, [Validators.required,Validators.email]),
          password : new FormControl(''),
          otp : new FormControl(''),
          confirmPassword : new FormControl('')
      });
  }

  validateEmail(){
      this.submitted = true;
      if (this.loginForm.valid) {
          this.common.showSpinner();
          //console.log('value',this.loginForm.value);
          
          let loginData = this.loginForm.value;
          this.curEmail=loginData.email;
          this.loginService.forgetPassword(loginData).subscribe(
              data => {
                  // console.log('usersValidate Email',data);
                  this.emailValidated = false;
                  this.checkOtp = false;
                  this.submitted = false;

                  if(data.data != false){
                      this.formData.email.disable(); // disable email input field
                      // this.formData.email.value=;
                      if(data.code == 'USS006'){ // if verified and also changedPassword / if user is admin then also
                          // this.loginForm.addControl('password', new FormControl('', Validators.required));
                          this.formData.password.setValidators(Validators.required);
                          this.emailValidated = true;
                      }
                      else if(data.code == 'USS008'){ // if verified but forgot his password
                          this.emailValidated = true;
                          this.checkOtp = true;
                          this.formData.otp.setValidators(Validators.required);
                          this.formData.password.setValidators(Validators.required);
                          this.formData.confirmPassword.setValidators(Validators.required);

                      }
                      else if(data.code == 'USS007'){ // if user is valid but not verified is email
                          this.emailValidated = false;
                          this.checkOtp = false;
                      }

                      
                      this.common.openSnackBar(data.message, '', 'success-snackbar');
                  }
                  else
                  {
                      this.common.openSnackBar(data.message, '', 'danger-snackbar')
                  }

                  this.common.hideSpinner();
              },
              sError => { }
          );
      }

  }

  onSubmitLoginForm() {
      this.submitted = true;
      if (this.loginForm.valid) {
          let loginData = this.loginForm.getRawValue();
           //console.log('loginData',loginData.email);
          
              this.loginService.updateUserpassword(loginData).subscribe(
                  data => {
                      // console.log('usersLoginData',data.data);
                      if(data.data != false){
                        this.common.openSnackBar('New Password Set Successfully', '', 'success-snackbar');
                        this.router.navigateByUrl("/login");

                          // const userData = data.data
                          // this.saveToken(userData.token);
                          // this.common.setLocalStorage("userDetails", JSON.stringify(userData));
                          // this.getUserPermissions(userData.roleId);
                      }
                      else
                      {
                          this.formData.email.disable();
                          this.common.hideSpinner();
                          this.common.openSnackBar(data.message, '', 'danger-snackbar')
                      }
                  },
                  sError => { }
              );
          }
          
      
      
      // this.router.navigateByUrl("/dashboard/welcome");
  }

  resendOtp(){
     let obj={
         email:this.curEmail
     }
     this.loginService.resendOtp(obj).subscribe((data:any)=>{
       if(data){
        this.common.openSnackBar('New OTP Email has sent to set new password', '','success-snackbar');
       }else{
        this.common.openSnackBar('Error in generating otp','', 'danger-snackbar')  
       }
       
     },
    sError => { }
    );
    
  }

  private getUserPermissions(roleId){
      const userData = { roleId : roleId };
      this.loginService.getUserPermissions(userData).subscribe(
          data => {
              // console.log('userPermission',data);
              const userPermission = data.data;
              // this.savePermission(userPermission.modulePermission);
              this.common.setLocalStorage("modulePermission", userPermission.modulePermission);
              this.getMenuList(roleId);
          },
          sError => { }
      );
          
  }

  private getMenuList(roleId){
      this.loginService.getMenuList(roleId).subscribe(
          data => {
              // // console.log('MenuList',data.data);
              // this.saveMenuList(data.data);
              this.common.setLocalStorage("menuList", data.data);
              this.common.openSnackBar('Login Successfull!!!', '', 'success-snackbar')
              this.common.hideSpinner();
              this.router.navigateByUrl("/dashboard");
          },
          sError => { }
      );
          
  }

  private saveToken(token): void {
      //// console.log('here to decode');
      // let ls = new SecureLS({encodingType: 'aes',encryptionSecret:'cari@tor'});
      // ls.set("permission", data.roleId);
      // ls.set("assigns", data.projects);
      localStorage.setItem("mean-token", token);
      // localStorage.setItem("permission", permission);
  }

  // private savePermission(modulePermission){
  //     this.SecureLS = new SecureLS({encodingType: 'aes',encryptionSecret:'cari@tor'});
  //     this.SecureLS.set("modulePermission", modulePermission);
      
  // }

  // private saveMenuList(menuList){
  //     this.SecureLS.set('menuList',menuList);
  // }
  
  onSubmitForgotPasswordForm() {
  }
  // forgetPassword(){

  // }
}
