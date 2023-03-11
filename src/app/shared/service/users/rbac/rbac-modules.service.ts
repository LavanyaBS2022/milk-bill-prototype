import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppConfigService } from '../../../../shared/service/common/app-config.service';

@Injectable({
    providedIn: 'root'
})
export class RbacModulesService {
    private getModuleUrl : string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private readonly appConfig: AppConfigService
    ) {
        this.getModuleUrl = this.appConfig.generateApiUrl('users.getModules');
    }

    public getModules(): Observable<any> {
        const queryParams = {};
        const options= this.appConfig.generateOption(queryParams);
        return this.http.get(this.getModuleUrl,options);
    }
    
}
