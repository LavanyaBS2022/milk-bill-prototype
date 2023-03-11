import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppConfigService } from '../../../../shared/service/common/app-config.service';

@Injectable({
    providedIn: 'root'
})
export class AccessMappingService {
    private getAccessPermissionUrl : string;
    private updateAccessMappingUrl : string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private readonly appConfig: AppConfigService
    ) {
        this.getAccessPermissionUrl = this.appConfig.generateApiUrl('users.getAccessPermission');
        this.updateAccessMappingUrl = this.appConfig.generateApiUrl('users.updateAccessMapping');    
    }

    public getAccessPermission(accessMapForm : any): Observable<any> {
        const queryParams = new HttpParams()
            .set('roleId', accessMapForm.roleId)
            .set('moduleId', accessMapForm.moduleId)
            .set('type', accessMapForm.type);
        const options= this.appConfig.generateOption(queryParams);
        return this.http.get(this.getAccessPermissionUrl,options);
    }
    
    public updateAccessMapping(accessMappingData : object): Observable<any> {
        const queryParams = new HttpParams();
        const options= this.appConfig.generateOption(queryParams);
        return this.http.post(this.updateAccessMappingUrl,accessMappingData, options);
    }
}
