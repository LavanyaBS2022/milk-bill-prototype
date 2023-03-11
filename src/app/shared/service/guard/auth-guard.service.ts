import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Common } from '../common/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    private token: string;
    private moduleName : string;
    private permissionName : string;
    private modulePermission: any;
    private role;
    constructor(private router: Router,private common : Common) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log("canActivate Route Data",route.data);
        //console.log(state.url);
        this.moduleName = route.data.module;
        this.permissionName = route.data.permission;

        if (!this.getToken()) {
            // console.log('Auth Guard');
            this.router.navigate(["login"])
            return false;
        }
        else {
            // if ther its dashboard then we do nothing.
            if(this.moduleName == 'Dashboard'){
                return true;
            }
            // check if permissionName not set then redirect to 404 page
            if(!this.permissionName){
                this.router.navigateByUrl('/404');
            }
            else{ // else we validate permissionName with our modulePermission set
                this.validateModulePermission();
            }
            
            return true;
        }


    }

    private getToken(): string {
        // window.localStorage.removeItem('mean-token');
        this.token = localStorage.getItem("mean-token");
        // console.log('asdasd',this.token);
        return this.token;
    }

    private validateModulePermission(){
        let foundPermission = false; // declare foundPermission variable with false value
        // encode the modulePermission array which is stored in localstorage
        this.modulePermission = this.common.getLocalStorage('modulePermission');
        // console.log(this.modulePermission);
        // from modulePermission data we find for moduleName name which is set in router
        let module = this.modulePermission.find(key => key.moduleName == this.moduleName);
        // console.log('validate module',module);
        if(module){ // if moduleName is found
            // from that module which we found, we look for the permission of the router called.
            let permission = module.permission.find(key => key == this.permissionName);
            // console.log('validate permission',permission);
            if(permission){ // if permission is found then we change foundPermission from false to true
                foundPermission = true;
            }
        }
        else{ // if module is not found then we alert this msg, this alert would ask developer to set the proper module name
            alert('Could Not find Module in modulePermission');
        }
        
        if(!foundPermission){ // if foundPermission is set to false, which means no permission for that page, so redirect to 403 error page
            this.router.navigateByUrl('/403');
        }
    }

}
