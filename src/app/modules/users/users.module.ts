import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from "../../angular.material.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AccessMappingComponent } from './rbac/access-mapping/access-mapping.component';
import { UserLimitExceededComponent } from './user/user-limit-exceeded/user-limit-exceeded.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        AngularMaterialModule, 
        UsersRoutingModule,
        SharedModule
    ],
    declarations: [
        AccessMappingComponent,
        AddUserComponent,
        EditUserComponent,
        ListUserComponent,
        UserLimitExceededComponent
    ]
})
export class UsersModule { }
