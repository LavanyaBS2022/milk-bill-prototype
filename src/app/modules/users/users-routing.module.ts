import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../../shared/service/guard/auth-guard.service';

// Import Containers 
import {
    AdminLayoutComponent,
    FullLayoutComponent,
    SimpleLayoutComponent
} from '../../containers';

import { AccessMappingComponent } from './rbac/access-mapping/access-mapping.component';
import { UserLimitExceededComponent} from './user/user-limit-exceeded/user-limit-exceeded.component'
const routes: Routes = [
    {
        path: 'access-mapping',
        component: AccessMappingComponent,
        data: {
          title: 'RBAC Access Mapping',
          permission : ''
        },
        // canActivate: [AuthGuardService]
    },
    // {
    //     path: 'add-user',
    //     component: AddUserComponent,
    //     data: {
    //       title: 'User Add',
    //       module: 'masters',
    //       permission : 'addUser'
    //     },
    //     canActivate: [AuthGuardService]
    // },
    // {
    //     path: 'edit-user',
    //     component: EditUserComponent,
    //     data: {
    //       title: 'User Edit',
    //       module: 'masters',
    //       permission : 'editUser'
    //     },
    //     canActivate: [AuthGuardService]
    // },
    // {
    //     path: 'list-user',
    //     component: ListUserComponent,
    //     data: {
    //       title: 'User List',
    //       module: 'masters',
    //       permission : 'listUser'
    //     },
    //     canActivate: [AuthGuardService]
    // },
    {
        path: 'user-limit-exceeded',
        component: UserLimitExceededComponent,
        data: {
          title: 'User Limit Exceeded',
          module: 'rbac',
          permission : 'listUser'
        },
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class UsersRoutingModule { }
