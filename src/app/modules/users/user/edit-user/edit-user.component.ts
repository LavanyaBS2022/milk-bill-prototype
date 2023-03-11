import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, FormGroupDirective, NgForm, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Common } from '../../../../shared/service/common/common';
import { RbacRolesService } from '../../../../shared/service/users/rbac/rbac-roles.service';
import { UsersService } from '../../../../shared/service/users/user/users.service';
import { MastersService } from './../../../../shared/service/masters/masters.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public submitted: boolean = true;
  private isSubmit : boolean = false;
  public showSubsidiary:boolean = false;
  public subsidiaryList;

  public usersForm: FormGroup;
  public userType;
  public roles = [];
  public franchiseList =[];
  public approvalRequiredList=[
    {id:0,name:'No'},
    {id:1,name:'Yes'}
  ]
  public showApprovalRequiredList:boolean = false;

  public showFranchise:boolean = false;
  public editId;
  public editedData;
  // public franchiseId;
  constructor(
      public common: Common,
      private rbacRolesService : RbacRolesService,
      private usersService : UsersService,
      public formBuilder: FormBuilder,
      private mastersService: MastersService,
      public route :ActivatedRoute,
      public router: Router
  ) {
    this.route.queryParams.subscribe(params=>{
      this.editId   = (atob(params.editId));
      this.getRoles();
      this.getSubsidiaries();
      this.getEditUserData(this.editId);
    });
   }

  ngOnInit() {
      this.createUsersForm();
  }

  get formData() {
      return this.usersForm.controls;
  }

  // initialize the Filter Form
  public createUsersForm() {
      this.usersForm = new FormGroup({
          firstName : new FormControl('', [Validators.required]),
          lastName : new FormControl('', Validators.required),
          email : new FormControl('', []),
          mobile : new FormControl('', []),
          roleId:  new FormControl('', []),
          franchiseId: new FormControl('', []),
          adminApprovalRequired: new FormControl('', []),
          subsidiaryId: new FormControl('', []),
      });
  }

  // to get All the Roles
  public getRoles(){
      this.rbacRolesService.getRoles().subscribe(data => {
           console.log('roles data',data.data);
          if(data.data != false){
              this.roles = data.data;
          }
      },
      sError => {
          // console.log("Project Error",sError);
      });
  }

  public getEditUserData(editId){
    let obj = {id : editId}
    this.usersService.listUsers(obj).subscribe(data => {
       console.log('edit data',data.data);
      this.editedData =  data.data;
      if(this.editedData[0].user_roleid == '5f3f65a09c0ed02bbc9e478f'){
        this.showApprovalRequiredList = true;
      }
      //show subsidiary for Admin Subs & sales role
      if(this.editedData[0].user_roleid == '5f3f65a09c0ed02bbc9e478f' || this.editedData[0].user_roleid == '5f522337bb29e2cd9b038461'){
        this.showSubsidiary = true;
      }
      if(this.editedData[0].franchiseId){
        this.showFranchise = true;
        this.getFranchiseList('Customer');
      }else{
        this.showFranchise = false;
      }
      this.usersForm.patchValue({
        firstName: this.editedData[0].first_name,
        lastName:this.editedData[0].last_name,
        email:this.editedData[0].email,
        mobile:this.editedData[0].mobile,
        roleId:this.editedData[0].user_roleid,
        franchiseId:this.editedData[0].franchiseId?this.editedData[0].franchiseId:0,
        adminApprovalRequired : this.editedData[0].admin_approval_required ? this.editedData[0].admin_approval_required : 0,
        subsidiaryId : this.editedData[0].subsidiary_id 
      });
      
    },
    sError => {
        this.common.apiError(sError);
    });
  }


  public onSubmit(){
      this.submitted = true;
      if (this.usersForm.valid) {
          // if user has selected franchise they pass user type as 2
        //   let type;
        //   let franchiseType="";
        //   if(this.userType=='Franchise'){
        //       type=2;
        //       franchiseType = "Secondary User";
        //   }
        //   else if(this.userType=='RBAC'){
        //       type=1
        //       franchiseType = "Primary User";
        //   }
        //   else{
        //       type=1
        //       franchiseType = "Primary User";
        //   }
          let usersData = this.usersForm.value;

          let obj = {
              id:this.editId,
              firstName: usersData.firstName,
              lastName: usersData.lastName,
            //   email: usersData.email,
              mobile: usersData.mobile,
              adminApprovalRequired : usersData.adminApprovalRequired,
              subsidiaryId : usersData.subsidiaryId
              //roleId: usersData.roleId,
              //franchiseId: usersData.franchiseId,
            //   user_type:type,
            //   franchise_type : franchiseType
          };
          // console.log(obj);
          // return;
          // usersService
        this.usersService.editUsers(obj).subscribe(data => {
            // console.log('data',data);
            this.common.openSnackBar('User Updated Successfully','', 'success-snackbar');
            // this.resetPage();
            this.router.navigateByUrl("/masters/list-user");

        },
        sError => {
            this.common.apiError(sError);
        });
        // console.log('usersData',obj);
      }

  }

  public resetPage(){

      this.usersForm.reset();
  }

  public getFranchiseList(userType){
    //console.log('hereeeeeeee');
    
      //save selected user time value for future use
      this.userType = userType;
      if(userType=='Customer'){
          this.showFranchise = true;
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
      }
      else{
          this.usersForm.controls["franchiseId"].clearValidators();
          this.showFranchise = false;
          this.usersForm.patchValue({
              franchiseId: ''
            }) 
      }
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
