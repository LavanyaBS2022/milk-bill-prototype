import { Component, OnInit } from '@angular/core';
import { LoginService } from "./../../shared/login.service";
import { UsersService } from './../../../../shared/service/users/user/users.service'; 
import { Common } from '../../../../shared/service/common/common';
import { Router,ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-verify-user-email',
    templateUrl: './verify-user-email.component.html',
    styleUrls: ['./verify-user-email.component.scss']
})
export class VerifyUserEmailComponent implements OnInit {
    private base64Email: string;
    public isVerifiedStatus: boolean = false;
    public userEmail: string;
    public msg: string;
    constructor(
        private usersService : UsersService,
        private loginService: LoginService,
        private router: Router,
        public common: Common,
        private activatedRoute : ActivatedRoute
    ) { }

    ngOnInit() {
        this.common.showSpinner();

        this.activatedRoute.params.subscribe(params => {
            this.base64Email = (params.base64Email) || '';

            // if(this.base64Email == ''){
            //     this.router.navigateByUrl("/login");
            // }
        });
        this.verifyUserEmail(this.base64Email);
    }

    public verifyUserEmail(base64Email:string){
        // console.log('base64Email',base64Email);
        const userData = { email :  base64Email};
        this.usersService.verifyUserEmail(userData).subscribe(
            data => {
                // console.log('verify data',data);
                // const userPermission = data.data;
                this.msg = data.message;
                if(data.data){
                    this.isVerifiedStatus = true;
                    this.userEmail = data.data;
                    
                }
                this.common.hideSpinner();
            },
            sError => { 
                // console.log('sError',sError);
            }
        );
    }
}
