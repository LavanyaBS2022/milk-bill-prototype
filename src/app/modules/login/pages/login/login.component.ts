import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "./../../shared/login.service";
import { MatDialog } from "@angular/material";
import * as SecureLS from "secure-ls";
import { Common } from "../../../../shared/service/common/common";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { MastersService } from "./../../../../shared/service/masters/masters.service";

import { DashboardService } from "./../../../../shared/service/dashboard/dashboard.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  componentModel;
  loginView = true;
  private token: string;
  showErrorMessage: boolean = false;

  public submitted: boolean = true;
  public isSubmit: boolean = false;
  public loginForm: FormGroup;
  private SecureLS: any;
  public emailValidated: boolean = false;
  public checkOtp: boolean = false;
  public forgetPassword: boolean = true;
  public rememberMe: any;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public common: Common,
    public mastersService: MastersService,
    public dashboardService: DashboardService
  ) {
    this.componentModel = {
      email: "",
      password: "",
    };
  }

  ngOnInit() {
    // sessionStorage.clear();
    // this.common.openSnackBar('Username and password incorrect!!!', '', 'danger-snackbar')
    this.createLoginForm();

    this.rememberMe = this.common.getLocalStorage("rememberMe");

    if (this.rememberMe) {
      this.rememberMe = JSON.parse(this.rememberMe);
      if (this.rememberMe.rememberMe) {
        this.loginForm.patchValue({
          email: this.rememberMe.email,
          password: this.rememberMe.password,
          rememberMe: this.rememberMe.rememberMe,
        });
        this.validateEmail();
      }
    }
  }

  get formData() {
    return this.loginForm.controls;
  }

  // initialize the Filter Form
  public createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl({ disabled: false, value: "" }, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(""),
      otp: new FormControl(""),
      confirmPassword: new FormControl(""),
      rememberMe: new FormControl(""),
    });
  }

  validateEmail() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.common.showSpinner();
      let loginData = this.loginForm.value;
      if (
        loginData.email == "caritormpcs@gmail.com" ||
        loginData.email == "caritordairy@gmail.com"||
        loginData.email == "customer@gmail.com"

      ) {
        this.common.hideSpinner();
        this.emailValidated = true;
        this.common.openSnackBar("Email Validated", "", "success-snackbar");
      } else {
        this.common.hideSpinner();

        this.common.openSnackBar(
          "No user exists with this user",
          "",
          "danger-snackbar"
        );
      }

      
    }
  }

  onSubmitLoginForm() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.common.showSpinner();
      this.formData.email.enable();
      let loginData = this.loginForm.value;
      if (loginData.password == "1234") {
        this.common.hideSpinner();
        this.common.openSnackBar("Login Success", "", "success-snackbar");
             this.getMenuList();
      } else {
        this.common.hideSpinner();
        this.common.openSnackBar(
          "Invalid Username and password",
          "",
          "danger-snackbar"
        );
      }
      // if(!this.formData.rememberMe.value){
      //     this.common.clearLocalStorage("rememberMe");
      // }

      // if(!this.checkOtp){
      //     this.loginService.authenticateLogin(loginData).subscribe(
      //         data => {
      //             console.log('usersLoginData',data.data);
      //             if (data.data != false) {
      //                 const userData = data.data;
      //                 let activeSeason;
      //                 //get Active Season id;
      //                 this.dashboardService.getBrandLoginSeasonList().subscribe((data) => {
      //                     // console.log('season list', data.data);
      //                     let seasonList = data.data;
      //                     let filteredSeasonDetails = seasonList.filter(t => t.active_season == 1);
      //                     // console.log('filteredSeasonDetails', filteredSeasonDetails);
      //                     activeSeason = filteredSeasonDetails[0].id;

      //                     if (userData.userType == 1) {
      //                         Object.assign(userData, { activeSeason: activeSeason });
      //                         this.saveToken(userData.token);

      //                         this.common.setLocalStorage("userDetails", JSON.stringify(userData));
      //                         this.getUserPermissions(userData.roleId[0]);
      //                     }
      //                     else {
      //                         this.saveToken(userData.token);
      //                         this.common.setLocalStorage("userDetails", JSON.stringify(userData));
      //                         this.getUserPermissions(userData.roleId[0]);
      //                     }

      //                     if(this.formData.rememberMe.value){ // if remember me is check then store the below details to localstorage
      //                         const rememberMe = {
      //                             email: this.formData.email.value,
      //                             password : this.formData.password.value,
      //                             rememberMe : this.formData.rememberMe.value
      //                         };
      //                         this.common.setLocalStorage("rememberMe", JSON.stringify(rememberMe));

      //                     }

      //                 });
      //                 // // console.log('response',data.data);
      //                 // const userData = data.data

      //                 // // console.log('OutSide IF BLOCK REACHED:', activeSeason);

      //                 // this.saveToken(userData.token);
      //                 // // return;

      //                 // this.common.setLocalStorage("userDetails", JSON.stringify(userData));
      //                 // // console.log('JSON.stringify(userData):::', JSON.stringify(userData));
      //                 // this.getUserPermissions(userData.roleId[0]);
      //                 // this.router.navigate(["dashboard-2"]);
      //                 // this.common.openSnackBar(data.message, '', 'success-snackbar')
      //                 // this.common.hideSpinner();
      //                 // this.router.navigateByUrl("/dashboard/welcome");

      //             }
      //             else
      //             {
      //                 this.formData.email.disable();
      //                 this.common.hideSpinner();
      //                 this.common.openSnackBar(data.message, '', 'danger-snackbar')
      //             }
      //         },
      //         sError => { }
      //     );
      // }else{
      //     this.loginService.updateUserpassword(loginData).subscribe(
      //         data => {
      //             // console.log('usersLoginData',data.data);
      //             if(data.data != false){
      //                 const userData = data.data
      //                 this.saveToken(userData.token);
      //                 this.common.setLocalStorage("userDetails", JSON.stringify(userData));
      //                 this.getUserPermissions(userData.roleId);
      //             }
      //             else
      //             {
      //                 this.formData.email.disable();
      //                 this.common.hideSpinner();
      //                 this.common.openSnackBar(data.message, '', 'danger-snackbar')
      //             }
      //         },
      //         sError => { }
      //     );
      // }
    }

    // this.router.navigateByUrl("/dashboard/welcome");
  }

  //   private getUserPermissions(roleId) {
  //     const userData = { roleId: roleId };
  //     this.loginService.getUserPermissions(userData).subscribe(
  //       (data) => {
  //         // console.log('userPermission',data);
  //         const userPermission = data.data;
  //         // this.savePermission(userPermission.modulePermission);
  //         this.common.setLocalStorage(
  //           "modulePermission",
  //           userPermission.modulePermission
  //         );
  //         this.getMenuList(roleId);
  //       },
  //       (sError) => {}
  //     );
  //   }

  private getMenuList() {
    let loginData = this.loginForm.value;

    if(loginData.email == "caritormpcs@gmail.com"){
      const res = {
        code: "",
        message: "",
        status: true,
        data: [
          {
            state: "dashboard",
            name: "Dashboards",
            type: "link",
            icon: "av_timer",
          },
          {
            state: "milk",
            name: "milk collection ",
            type: "sub",
            icon: "perm_data_setting",
            children: [
              { state: "mpcs_list", name: "MPCS/BMC List", type: "link" },
  
              {
                state: "daily_milk_collection_form",
                name: "Daily Milk Collection",
                type: "link",
              },
              {
                state: "cattle_feed_billing",
                name: "Cattle Feed Billing",
                type: "link",
              },
              {
                state: "cattle_feed_indent",
                name: "Cattle Feed Indent",
                type: "link",
              },{
                
                state: "farmer_master",
                name: "Farmer Master",
                type: "link",
              }
            ],
          },
          {
            state: "milk_reports",
            name: "Reports",
            type: "sub",
            icon: "apps",
            children: [
              {
                state: "daily_milk_collection",
                name: "Daily Milk Collection ",
                type: "link",
              },
              {
                state: "monthly_milk_collection",
                name: "Monthly Milk Collection ",
                type: "link",
              },
              { state: "payment_report", name: "Payment Report", type: "link" },
              {
                state: "bmc_kendra_report",
                name: "BMC Kendra Report",
                type: "link",
              },
              {
                state: "farmers_report",
                name: "Farmers Ledger",
                type: "link",
              },
              {
                state: "cattle_feed_report",
                name: "Cattle Feed Report",
                type: "link",
              },
             
            ],
          },
          // {
          //   state: "chilling_center",
          //   name: "Chilling Center",
          //   type: "sub",
          //   icon: "apps",
          //   children: [
          //     {
          //       state: "day_wise_milk_collection_cc",
          //       name: "Milk Collection ",
          //       type: "link",
          //     },
          //     {
          //       state: "mpcs_cc_payment_report",
          //       name: "MPCS/BMC Payment ",
          //       type: "link",
          //     },
          //     {
          //       state: "monthly_milk_collection_cc",
          //       name: "Monthly Collection ",
          //       type: "link",
          //     },
          //       state: "bmc_cluster",
          //       name: "BMC Cluster ",
          //       type: "link",
          //     },
          
          //   ],
          // },
          // {
          //   state: "farmer",
          //   name: "Farmer",
          //   type: "sub",
          //   icon: "apps",
          //   children: [
          //     {
          //       state: "milk_contribution",
          //       name: "Monthly Contribution ",
          //       type: "link",
          //     },
          //     {
          //       state: "farmer_ledger",
          //       name: "Farmer Ledger ",
          //       type: "link",
          //     },
          //     {
          //       state: "notification",
          //       name: "Notification ",
          //       type: "link",
          //     },
          //     {
          //       state: "payment_info",
          //       name: "Payment Info ",
          //       type: "link",
          //     },
          //   ],
          // },
        ],
        trace: "",
      };
      this.common.setLocalStorage("userType",1);
      this.common.setLocalStorage("menuList", res.data);
      this.router.navigateByUrl("/dashboard");
    }
    if(loginData.email == "caritordairy@gmail.com"){
      const res = {
        code: "",
        message: "",
        status: true,
        data: [
          {
            state: "dashboard",
            name: "Dashboards",
            type: "link",
            icon: "av_timer",
          },
          // {
          //   state: "milk",
          //   name: "milk collection ",
          //   type: "sub",
          //   icon: "perm_data_setting",
          //   children: [
          //     { state: "mpcs_list", name: "MPCS/BMC List", type: "link" },
  
          //     {
          //       state: "daily_milk_collection_form",
          //       name: "Daily Milk Collection",
          //       type: "link",
          //     },
          //     {
          //       state: "cattle_feed_indent",
          //       name: "Cattle Feed Indent",
          //       type: "link",
          //     },
          //   ],
          // },
          // {
          //   state: "milk_reports",
          //   name: "Reports",
          //   type: "sub",
          //   icon: "apps",
          //   children: [
          //     {
          //       state: "daily_milk_collection",
          //       name: "Daily Milk Collection ",
          //       type: "link",
          //     },
          //     {
          //       state: "monthly_milk_collection",
          //       name: "Monthly Milk Collection ",
          //       type: "link",
          //     },
          //     { state: "payment_report", name: "Payment Report", type: "link" },
          //     {
          //       state: "bmc_kendra_report",
          //       name: "BMC Kendra Report",
          //       type: "link",
          //     },
          //     {
          //       state: "farmers_report",
          //       name: "Farmers Ledger",
          //       type: "link",
          //     },
          //     {
          //       state: "cattle_feed_report",
          //       name: "Cattle Feed Report",
          //       type: "link",
          //     },
             
          //   ],
          // },
          {
            state: "chilling_center",
            name: "Chilling Center",
            type: "sub",
            icon: "apps",
            children: [
              {
                state: "day_wise_milk_collection_cc",
                name: "Milk Collection ",
                type: "link",
              },
              {
                state: "mpcs_cc_payment_report",
                name: "MPCS/BMC Payment ",
                type: "link",
              },
              {
                state: "monthly_milk_collection_cc",
                name: "Monthly Collection ",
                type: "link",
              },
               { state: "bmc_cluster",
                name: "BMC Cluster ",
                type: "link",
              },
              { state: "ptc_list",
                name: "PTC List ",
                type: "link",
              },
              { state: "ptc_transaction",
                name: "PTC Transaction ",
                type: "link",
              },
              {
                state: "bulk_milk_transfer",
                name: "Bulk Milk Transfer",
                type: "link",
              },
              
          
            ],
          },
          // {
          //   state: "farmer",
          //   name: "Farmer",
          //   type: "sub",
          //   icon: "apps",
          //   children: [
          //     {
          //       state: "milk_contribution",
          //       name: "Monthly Contribution ",
          //       type: "link",
          //     },
          //     {
          //       state: "farmer_ledger",
          //       name: "Farmer Ledger ",
          //       type: "link",
          //     },
          //     {
          //       state: "notification",
          //       name: "Notification ",
          //       type: "link",
          //     },
          //     {
          //       state: "payment_info",
          //       name: "Payment Info ",
          //       type: "link",
          //     },
          //   ],
          // },
        ],
        trace: "",
      };
      this.common.setLocalStorage("userType",2);
      this.common.setLocalStorage("menuList", res.data);
      this.router.navigateByUrl("/dashboard");
    }
    if(loginData.email == "customer@gmail.com"){
      const res = {
        code: "",
        message: "",
        status: true,
        data: [
          {
            state: "dashboard",
            name: "Dashboards",
            type: "link",
            icon: "av_timer",
          },
          // {
          //   state: "milk",
          //   name: "milk collection ",
          //   type: "sub",
          //   icon: "perm_data_setting",
          //   children: [
          //     { state: "mpcs_list", name: "MPCS/BMC List", type: "link" },
  
          //     {
          //       state: "daily_milk_collection_form",
          //       name: "Daily Milk Collection",
          //       type: "link",
          //     },
          //     {
          //       state: "cattle_feed_indent",
          //       name: "Cattle Feed Indent",
          //       type: "link",
          //     },
          //   ],
          // },
          // {
          //   state: "milk_reports",
          //   name: "Reports",
          //   type: "sub",
          //   icon: "apps",
          //   children: [
          //     {
          //       state: "daily_milk_collection",
          //       name: "Daily Milk Collection ",
          //       type: "link",
          //     },
          //     {
          //       state: "monthly_milk_collection",
          //       name: "Monthly Milk Collection ",
          //       type: "link",
          //     },
          //     { state: "payment_report", name: "Payment Report", type: "link" },
          //     {
          //       state: "bmc_kendra_report",
          //       name: "BMC Kendra Report",
          //       type: "link",
          //     },
          //     {
          //       state: "farmers_report",
          //       name: "Farmers Ledger",
          //       type: "link",
          //     },
          //     {
          //       state: "cattle_feed_report",
          //       name: "Cattle Feed Report",
          //       type: "link",
          //     },
             
          //   ],
          // },
          // {
          //   state: "chilling_center",
          //   name: "Chilling Center",
          //   type: "sub",
          //   icon: "apps",
          //   children: [
          //     {
          //       state: "day_wise_milk_collection_cc",
          //       name: "Milk Collection ",
          //       type: "link",
          //     },
          //     {
          //       state: "mpcs_cc_payment_report",
          //       name: "MPCS/BMC Payment ",
          //       type: "link",
          //     },
          //     {
          //       state: "monthly_milk_collection_cc",
          //       name: "Monthly Collection ",
          //       type: "link",
          //     },
          //      { state: "bmc_cluster",
          //       name: "BMC Cluster ",
          //       type: "link",
          //     },
          
          //   ],
          // },
          {
            state: "farmer",
            name: "Farmer",
            type: "sub",
            icon: "apps",
            children: [
              {
                state: "milk_contribution",
                name: "Monthly Contribution ",
                type: "link",
              },
              {
                state: "farmer_ledger",
                name: "Farmer Ledger ",
                type: "link",
              },
              {
                state: "notification",
                name: "Notification ",
                type: "link",
              },
              {
                state: "payment_info",
                name: "Payment Info ",
                type: "link",
              },
            ],
          },
        ],
        trace: "",
      };
      this.common.setLocalStorage("userType",3);
      this.common.setLocalStorage("menuList", res.data);
      this.router.navigateByUrl("/dashboard");
    }
    
    // this.loginService.getMenuList(roleId).subscribe(
    //     data => {
    //          //console.log('MenuList',data.data);
    //          let menuList=data.data;
    //          if(roleId=='5e4e58824821f16b4c63e0ce'){
    //           let x=menuList[1].children[0];
    //           menuList[1].children.shift();
    //           menuList[1].children.push(x);
    //          }
    //          //console.log('After MenuList',menuList);

    //         // this.saveMenuList(data.data);
    //         this.common.setLocalStorage("menuList", menuList);
    //         this.common.openSnackBar('Login Successfull!!!', '', 'success-snackbar')
    //         this.common.hideSpinner();
    //         this.router.navigateByUrl("/dashboard");
    //     },
    //     sError => { }
    // );
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

  onSubmitForgotPasswordForm() {}
  // forgetPassword(){

  // }
}
