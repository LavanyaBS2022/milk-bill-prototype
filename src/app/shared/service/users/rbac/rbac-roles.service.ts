import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppConfigService } from '../../../../shared/service/common/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class RbacRolesService {
    private getRolesUrl : string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private readonly appConfig: AppConfigService
    ) {
        this.getRolesUrl = this.appConfig.generateApiUrl('users.getRoles');
    }

    public getRoles(): Observable<any> {
        const queryParams = {};
        const options= this.appConfig.generateOption(queryParams);
        return this.http.get(this.getRolesUrl,options);
    }
    
}
