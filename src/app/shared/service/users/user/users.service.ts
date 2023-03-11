import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppConfigService } from '../../../../shared/service/common/app-config.service';

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private addUsersUrl : string;
    private listUsersUrl : string;
    private deleteUsersUrl : string;
    private editUsersUrl : string;
    private verifyUserEmailURL : string;
    private checkUserLimitUrl : string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private readonly appConfig: AppConfigService
    ) {
        this.addUsersUrl = this.appConfig.generateApiUrl('users.addUser');
        this.verifyUserEmailURL = this.appConfig.generateApiUrl('users.verifyUserEmail');
        this.listUsersUrl = this.appConfig.generateApiUrl('users.listUser');
        this.deleteUsersUrl = this.appConfig.generateApiUrl('users.deleteUser');
        this.editUsersUrl = this.appConfig.generateApiUrl('users.editUser');
        this.checkUserLimitUrl = this.appConfig.generateApiUrl('users.checkUserLimit');

    }

    public addUsers(usersData : object): Observable<any> {
        const queryParams = new HttpParams();
        const options= this.appConfig.generateOption(queryParams);
        return this.http.post(this.addUsersUrl,usersData, options);
    }
    public listUsers(usersData : object): Observable<any> {
        const queryParams = new HttpParams();
        const options= this.appConfig.generateOption(queryParams);
        return this.http.post(this.listUsersUrl,usersData, options);
    }
    public deleteUsers(usersData : object): Observable<any> {
        const queryParams = new HttpParams();
        const options= this.appConfig.generateOption(queryParams);
        return this.http.post(this.deleteUsersUrl,usersData, options);
    }
    public editUsers(usersData : object): Observable<any> {
        const queryParams = new HttpParams();
        const options= this.appConfig.generateOption(queryParams);
        return this.http.post(this.editUsersUrl,usersData, options);
    }
    

    public verifyUserEmail(usersData : object): Observable<any> {
        const queryParams = new HttpParams();
        this.headers = this.headers.set('Authorization', '');
        const options = {
            params: queryParams,
            headers: this.headers
        };
        return this.http.post(this.verifyUserEmailURL,usersData, options);
    }
    public checkUserLimit(): Observable<any> {
        const queryParams = new HttpParams();
        const options= this.appConfig.generateOption(queryParams);
        return this.http.get(this.checkUserLimitUrl, options);
    }
}
