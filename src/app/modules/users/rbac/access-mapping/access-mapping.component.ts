import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Common } from '../../../../shared/service/common/common';
import { AccessMappingService } from '../../../../shared/service/users/rbac/access-mapping.service';
import { RbacRolesService } from '../../../../shared/service/users/rbac/rbac-roles.service';
import { RbacModulesService } from '../../../../shared/service/users/rbac/rbac-modules.service';

@Component({
  selector: 'app-access-mapping',
  templateUrl: './access-mapping.component.html',
  styleUrls: ['./access-mapping.component.scss']
})
export class AccessMappingComponent implements OnInit {
    public submitted: boolean;
    public isSubmit : boolean = false;
    public accessMapForm: FormGroup;
    public roles = [];
    public modules = [];
    public accessMapping : any;
    public type = [
        { value: '1', viewValue: 'Menu' },
        { value: '2', viewValue: 'Page' },
        { value: '3', viewValue: 'Action' }  
      ];

      
    constructor(
        public common: Common,
        private accessMappingService : AccessMappingService,
        private rbacRolesService : RbacRolesService,
        private rbacModulesService : RbacModulesService
    ) { }

    ngOnInit() {
        this.createAccessMapForm();
        this.getRoles();
        this.getModules();
    }

    get formData() {
        return this.accessMapForm.controls;
    }

    // initialize the Filter Form
    public createAccessMapForm() {
        this.accessMapForm = new FormGroup({
            roleId: new FormControl('', Validators.required),
            moduleId: new FormControl(''),
            type : new FormControl('1')
        });
    }

    // to get All the Roles
    public getRoles(){
        this.rbacRolesService.getRoles().subscribe(data => {
            // console.log('roles data',data);
            if(data.data != false){
                this.roles = data.data;
            }
        },
        sError => {
            this.common.apiError(sError);
        });
    }

    // to get All the Modules
    public getModules(){
        this.rbacModulesService.getModules().subscribe(data => {
            // console.log('Module data',data);
            if(data.data != false){
                this.modules = data.data;
            }
        },
        sError => {
            this.common.apiError(sError);
        });
    }

    public load(){
        this.submitted = true;
        if (this.accessMapForm.valid) {
            let accessMapForm = this.accessMapForm.value;
            
            this.accessMappingService.getAccessPermission(accessMapForm).subscribe(data => {
                // console.log('access Permission data',data);
                if(data.data != false){
                    this.isSubmit = true;
                    this.accessMapping = data.data;
                    // console.log('this.accessMapping',this.accessMapping);
                    this.common.openSnackBar('Found Access Mapping Data!!!', '', 'success-snackbar')
                }
            },
            sError => {
                this.common.apiError(sError);
            });

        }
        
    }

    public updateAccessMapping(){
        let deleteAccessMapping = [];
        let addAccessMapping = [];
        const roleId = this.formData.roleId.value;
        this.accessMapping.forEach(key => {
            key.permission.forEach(item => {
                if(!item.selected && item.mappedStatus == 1){
                    const tempDelete = {
                        accessMappingId : item.accessMappingId
                    }
                    deleteAccessMapping.push(item.accessMappingId);
                }
                // 
                if(item.selected && item.mappedStatus != 1){
                    const tempAdd = {
                        role_id : roleId,
                        module_id : key.moduleId,
                        module_name : key.moduleName,
                        permission_id : item.permissionId,
                        permission_name : item.permissionName,
                        created_user : '1001'
                    }

                    addAccessMapping.push(tempAdd);
                }
            });
        });

        if(deleteAccessMapping.length == 0 && addAccessMapping.length == 0){
            this.common.openSnackBar('Their is no change made', '', 'danger-snackbar')
        }
        else{
            const accessMappingData = {
                'addAccessMapping' : addAccessMapping,
                'deleteAccessMapping' : deleteAccessMapping
            }
            this.accessMappingService.updateAccessMapping(accessMappingData).subscribe(data => {
                // console.log('data',data);
                this.common.openSnackBar('Successfully Updated Access Mapping Data!!!','', 'success-snackbar');
                this.resetPage();
            },
            sError => {
                this.common.apiError(sError);
            });
        }
        // console.log('addAccessMapping',addAccessMapping);
        // console.log('deleteAccessMapping',deleteAccessMapping);
    }

    resetPage(){
        this.accessMapping = [];
        this.accessMapForm.patchValue({
            roleId: '',
            moduleId: '',
            type : '1'
        });
        this.isSubmit = false;
    }
}
