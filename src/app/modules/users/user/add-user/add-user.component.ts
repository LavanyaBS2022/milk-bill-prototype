import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, FormGroupDirective, NgForm, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Common } from '../../../../shared/service/common/common';
import { RbacRolesService } from '../../../../shared/service/users/rbac/rbac-roles.service';
import { UsersService } from '../../../../shared/service/users/user/users.service';
import { MastersService } from './../../../../shared/service/masters/masters.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatOption } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {
    public submitted: boolean = true;
    private isSubmit: boolean = false;
    public usersForm: FormGroup;
    public userType;
    public roles = [];
    public franchiseList = [];
    public showFranchise: boolean = false;
    private showCustomers: boolean = false;
    public subsidiaryList;
    public showSubsidiary:boolean = false;

    // public franchiseId;
    public showApprovalRequiredList:boolean = false;
    public approvalRequiredList=[
        {id:0,name:'No'},
        {id:1,name:'Yes'}
      ]
    constructor(
        public common: Common,
        private rbacRolesService: RbacRolesService,
        private usersService: UsersService,
        public formBuilder: FormBuilder,
        private mastersService: MastersService,
        private router: Router,
        private spinner:NgxSpinnerService
    ) { }

    ngOnInit() {
        this.checkLimit();
        // this.openDialog();
        this.createUsersForm();
        this.getRoles();
        this.getSubsidiaries();

        let obj = {};
        this.usersService.listUsers(obj).subscribe(data => {
            // console.log('received data',data);
            //this.common.openSnackBar('User Added Successfully', '', 'success-snackbar');
            this.resetPage();
        },
            sError => {
                this.common.apiError(sError);
            });
    }

    get formData() {
        return this.usersForm.controls;
    }

    // initialize the Filter Form
    public createUsersForm() {
        this.usersForm = new FormGroup({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', [Validators.required]),
            mobile: new FormControl('', []),
            roleId: new FormControl('', [Validators.required]),
            franchiseId: new FormControl('', []),
            adminApprovalRequired: new FormControl('', []),
            subsidiaryId: new FormControl('', []),

            //salesCustomerIds: new FormControl('', [])
        });
    }

    // to get All the Roles
    public getRoles() {
        this.rbacRolesService.getRoles().subscribe(data => {
            // console.log('roles data',data);
            if (data.data != false) {
                this.roles = data.data;
            }
        },
            sError => {
                // console.log("Project Error",sError);
            });
    }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
        let pass = group.controls.password.value;
        let confirmPass = group.controls.confirmPassword.value;
        // console.log('I have reached here');
        return pass === confirmPass ? null : { notSame: true }
    }
  
    public onSubmit() {
        this.submitted = true;

        if (this.usersForm.valid) {
            // if user has selected franchise they pass user type as 2
            let type;
            let franchiseType = "";
            if (this.userType == 'Customer') {
                type = 2;
                franchiseType = "Secondary User";
                console.log(this.franchiseList.filter(item=>item.id== this.formData.franchiseId.value));
                const customerData = this.franchiseList.filter(item=>item.id== this.formData.franchiseId.value);
                this.usersForm.patchValue({
                    subsidiaryId : customerData[0].subsidiary_id 
                });
            }
            else if (this.userType == 'RBAC') {
                type = 1
                franchiseType = "Primary User";
            }
            //manually adding sunsiday for aap admin user
            else if(this.userType == 'AAP Admin') {
                type = 1
                franchiseType = "Primary User";
                this.usersForm.patchValue({
                    subsidiaryId : 3 
                });
            }
            else {
                type = 1
                franchiseType = "Primary User";
            }
            let usersData = this.usersForm.value;

            let obj = {
                firstName: usersData.firstName,
                lastName: usersData.lastName,
                email: usersData.email,
                password: usersData.password,
                confirmPassword: usersData.confirmPassword,
                mobile: usersData.mobile,
                roleId: usersData.roleId,
                franchiseId: usersData.franchiseId,
                user_type: type,
                franchise_type: franchiseType,
                adminApprovalRequired : usersData.adminApprovalRequired,
                subsidiaryId : usersData.subsidiaryId

                //sales_customer: usersData.salesCustomerIds
            };

            // let usersData = this.usersForm.value;
            if (usersData.password != usersData.confirmPassword) {
                this.common.openSnackBar('Password and Confirm Password does not match', '', 'danger-snackbar')
            }
            else {
                // console.log(obj);
                // return;
                // usersService
                this.usersService.addUsers(obj).subscribe(data => {
                    // console.log('data',data);
                    if(data.data){
                        this.common.openSnackBar('User Added Successfully', '', 'success-snackbar');
                        this.router.navigateByUrl("/users/list-user");
                    }
                    else{
                        this.common.openSnackBar(data.message, '', 'danger-snackbar');
                    }

                    // this.resetPage();
                },
                    sError => {
                        this.common.apiError(sError);
                    });
            }
            console.log('usersData', usersData);
        }

    }

    public resetPage() {

        this.usersForm.reset();
    }

    public getFranchiseList(userType) {
        //save selected user time value for future use
        console.log(userType);
        
        this.userType = userType;
        //   this.selectedRole = userType;
        if (this.userType == 'Customer') {
            this.showCustomers = false;
            this.showFranchise = true;
            this.showApprovalRequiredList = false;
            this.showSubsidiary = false;

            this.usersForm.controls["franchiseId"].setValidators(Validators.required);

            this.mastersService.getlistFranchise().subscribe(
                sResponseModel => {
                    // console.log('franchiseList', sResponseModel);
                    if (sResponseModel.data != false) {
                        this.franchiseList = sResponseModel.data;
                    }
                },
                sError => {
                    this.common.apiError(sError);
                }
            );
        } else if (this.userType == 'Sales' ) {
            this.showFranchise = false;
            this.showApprovalRequiredList = true;
            this.showSubsidiary = true;

            //this.getSalesList();
        }
        else if(this.userType == 'Admin(subs)'){
            this.showSubsidiary = true;
            this.showApprovalRequiredList = false;
            this.showFranchise = false;

        }
        else {
            this.usersForm.controls["franchiseId"].clearValidators();
            this.showFranchise = false;
            this.showApprovalRequiredList = false;
            this.showApprovalRequiredList = false;
            this.showSubsidiary = false;

            this.usersForm.patchValue({
                franchiseId: ''
            })
        }
        
        //show subsidiary for Admin Subs & sales role
        // if(this.userType == 'Sales' || this.userType == 'Admin(subs)'){
        //     this.showSubsidiary = true;
        // }
    }

    public getSalesList() {
        if (this.userType == 'Sales') {

            this.showCustomers = true;
            this.usersForm.controls["salesCustomerIds"].setValidators(Validators.required);
            this.mastersService.getlistFranchise().subscribe(
                sResponseModel => {
                    // console.log('franchiseList', sResponseModel);
                    if (sResponseModel.data != false) {
                        this.franchiseList = sResponseModel.data;
                    }
                },
                sError => {
                    this.common.apiError(sError);
                }
            );
        }
        else {
            this.usersForm.controls["salesCustomerIds"].clearValidators();
            this.showCustomers = false;
            this.usersForm.patchValue({
                salesCustomerIds: []
            })
        }
    }
    // openDialog(): void {
    //     const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
    //       width: '400px',
    //       data: {
    //         currentStoreName: this.currentStoreName,
    //         copyStoreFromId: this.copyStoreFromId,
    //         copyStoreToId: this.copyStoreToId,
    //         franchiseStoreList: this.franchiseStoreList
    //       }
    //     });
    
    //     dialogRef.afterClosed().subscribe(result => {
    //       // console.log('The dialog was closed', result);
    //       if (result.copyStoreToId == undefined) {
    //         this.common.openSnackBar('Please Select Store Id to Copy..', '', 'danger-snackbar');
    //       }
    //       else {
    //         let obj = {
    //           seasonId: this.seasonId,
    //           orderWindowId: this.orderWindowId,
    //           franchiseeId: this.franchiseId,
    //           order_id: this.orderId,
    //           copyStoreFromId: parseInt(this.storeId),
    //           copyStoreToId: parseInt(result.copyStoreToId),
    //           created_user: 1,
    //           created_date: new Date(),
    //         }
    //         //check already have ordered for this store
    //         let object = {
    //           seasonId: this.seasonId,
    //           orderWindowId: this.orderWindowId,
    //           franchiseeId: this.franchiseId,
    //           brandId: this.brandId,
    //           storeId: parseInt(result.copyStoreToId),
    //         }
    //         this.targetService.getOrder(object.seasonId, object.orderWindowId, object.franchiseeId, object.storeId, object.brandId).subscribe((sResponse: any) => {
    //           let data = sResponse.data;
    //           //console.log('order data',data);
              
    //           let storeData = this.franchiseStoreList.filter(item => item.store_id == result.copyStoreToId)
    //           console.log(storeData,'storeData');
    //         if(storeData[0].order_status_id == 4){
    //             this.common.openSnackBar('Unable to copy as order for this store has already been Approved!!', '', 'danger-snackbar');
    //           }else if (storeData[0].order_status_id == 3){
    //             this.common.openSnackBar('Unable to copy as order for this store is Pending for Review!!', '', 'danger-snackbar');
    //           }else{
    //           if (data[0].id) {
    //             //already 
    //             this.common.openConfirmDialog('Already Order Existing for "' + storeData[0].store_name + '" Store. Do you want to overwrite?')
    //               .afterClosed().subscribe(res => {
    //                 if (res) {
    //                   this.ordersService.copyStoreData(obj).subscribe(copyStoreData => {
    //                     // console.log('copystore', copyStoreData)
    //                     if (copyStoreData) {
    //                       this.common.openSnackBar('Successfully Copied!!!', '', 'success-snackbar');
    //                       this.router.navigate(['orders/store-sales-analysis']);
    
    //                     }
    //                   },
    //                     sError => {
    //                       this.common.apiError(sError);
    //                     })
    //                 }
    //               });
    //           }
    //           else {
    
    //             this.common.openConfirmDialog('Do you want to copy from "' + this.currentStoreName + '" store to "' + storeData[0].store_name + '" store?')
    //               .afterClosed().subscribe(res => {
    //                 if (res) {
    //                   this.ordersService.copyStoreData(obj).subscribe(copyStoreData2 => {
    //                     // console.log('copystore', copyStoreData2)
    //                     if (copyStoreData2) {
    //                       this.common.openSnackBar('Successfully Copied!!!', '', 'success-snackbar');
    //                       this.router.navigate(['orders/store-sales-analysis']);
    
    //                     }
    //                   },
    //                     sError => {
    //                       this.common.apiError(sError);
    //                     })
    //                 }
    //               });
    //            }
    //           }
    //         },
    //           sError => {
    //             this.common.apiError(sError);
    //           })
    //       }
    //     });
    
    //   }
    public checkLimit(){
        this.spinner.show();
        this.usersService.checkUserLimit().subscribe(data => {
            this.spinner.hide();

            console.log('checkUserLimit',data);
            if(data.data == false){
                // this.common.openSnackBar('User Added Successfully', '', 'success-snackbar');
                // this.router.navigateByUrl("/users/list-user");
                this.router.navigateByUrl("/users/user-limit-exceeded");

                this.common.openSnackBar(data.message,'', 'danger-snackbar');
            }
            // else{
            //     this.common.openSnackBar('User Added Successfully', '', 'success-snackbar');
            //     this.router.navigateByUrl("/users/list-user");
            // }
            // this.resetPage();
        },
        sError => {
            this.common.apiError(sError);
        });
    }
    public getSubsidiaries(){
        this.mastersService.getSubsidiaries().subscribe((sResponse:any)=>{
          this.subsidiaryList=sResponse.data;
          //console.log('Subsidiary',sResponse);
        }, sError => {
          this.common.openSnackBar('No Subsidiaries person found','', 'danger-snackbar');
        });
      }
}
