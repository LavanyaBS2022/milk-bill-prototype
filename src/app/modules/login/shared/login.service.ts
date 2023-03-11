import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppConfigService } from '../../../shared/service/common/app-config.service';

import 'rxjs/Rx';
@Injectable({
    providedIn: 'root'
})

export class LoginService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private authenticateURL: string;
    private getUserPermissionsURL : string;
    private getMenuListURL : string;
    private validateUserEmailURL : string;
    private updateUserpasswordURL : string;
    private forgetPasswordURL : string;
    private resendOtpUrl:string;
    constructor(
        private http: HttpClient,
        private router: Router,
        private readonly appConfig: AppConfigService
    ) {
        this.authenticateURL = this.appConfig.generateApiUrl('authentication.login');
        this.getUserPermissionsURL = this.appConfig.generateApiUrl('authentication.getUserPermissions');
        this.getMenuListURL = this.appConfig.generateApiUrl('authentication.getMenuList');
        this.validateUserEmailURL = this.appConfig.generateApiUrl('authentication.validateUserEmail');
        this.updateUserpasswordURL = this.appConfig.generateApiUrl('authentication.updateUserpassword');
        this.forgetPasswordURL = this.appConfig.generateApiUrl('authentication.forgetPassword');
        this.resendOtpUrl = this.appConfig.generateApiUrl('authentication.resendOtp');

    }

    public authenticateLogin(loginData : object): Observable<any> {
        const queryParams = new HttpParams();
        this.headers = this.headers.set('Authorization', '');
        const options = {
            params: queryParams,
            headers: this.headers
        };
        return this.http.post(this.authenticateURL,loginData, options);
    }

    public getUserPermissions(userData : object): Observable<any> {
        const queryParams = new HttpParams();
        const options= this.appConfig.generateOption(queryParams);
        return this.http.post(this.getUserPermissionsURL,userData, options);
    }

    public getMenuList(role_id:string): Observable<any> {
        const queryParams = new HttpParams().set('roleId', role_id);
        const options= this.appConfig.generateOption(queryParams);
        return this.http.get(this.getMenuListURL,options);
    }

    public validateUserEmail(userData:Object):Observable<any>{
        const queryParams = new HttpParams();
        this.headers = this.headers.set('Authorization', '');
        const options = {
            params: queryParams,
            headers: this.headers
        };
        return this.http.post(this.validateUserEmailURL,userData, options);
    }
    public forgetPassword(userData:Object):Observable<any>{
        const queryParams = new HttpParams();
        this.headers = this.headers.set('Authorization', '');
        const options = {
            params: queryParams,
            headers: this.headers
        };
        return this.http.post(this.forgetPasswordURL,userData, options);
    }

    public resendOtp(userData:Object):Observable<any>{
        const queryParams = new HttpParams();
        this.headers = this.headers.set('Authorization', '');
        const options = {
            params: queryParams,
            headers: this.headers
        };
        return this.http.post(this.resendOtpUrl,userData, options);
    }
    
    public updateUserpassword(loginData : object): Observable<any> {
        const queryParams = new HttpParams();
        this.headers = this.headers.set('Authorization', '');
        const options = {
            params: queryParams,
            headers: this.headers
        };
        return this.http.post(this.updateUserpasswordURL,loginData, options);
    }

    requestLogin(sRequestModel): Observable<any> {
        const queryParams = {};
        this.headers = this.headers.set('Authorization', '');
        const options = {
            params: queryParams,
            headers: this.headers
        };

        return this.http.post(this.authenticateURL, sRequestModel, options)
        .map(response => {
            return response;
        })
        .catch(sError => {
            this.apiError(sError);
            throw sError;
        });

    }

    requestForgotPassword(sRequestModel): Observable<any> {

        return Observable.of(null);
    }

    apiError(sError) {

        if (sError.status == 401) {
            alert('Session Expired, Please login to continue');
            window.localStorage.removeItem('mean-token');
            this.router.navigateByUrl('/login');
            return;
        }
        alert('Server Error. Please try later');
    }

}

