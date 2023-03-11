import { Injectable } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private headers = new HttpHeaders();
    private appSettings: any = null;
    constructor(private readonly configService: ConfigService) {
        this.appSettings = this.configService.getSettings();
    }

    public getAppSettings(key?: string): any {

        if (!key) {
            return this.appSettings;
        }
        const url = this.configService.getSettings<string>(key);
        return url;
        // return this.appSettings[key];
    }

    public getApiUrl(): string {
        // const myAppSettings = this.appSettings;
        const myAppSettings = this.configService.getSettings('apiUrl');
        return myAppSettings.apiProtocol + myAppSettings.apiServer + myAppSettings.apiPort + myAppSettings.baseApiUrl;
    }

    public generateApiUrl(key?: string): any {
        if (!key) {
            return this.appSettings;
        }
        const url = this.configService.getSettings<string>(key);
        const myAppSettings = this.configService.getSettings('apiUrl');
        return myAppSettings.apiProtocol + myAppSettings.apiServer + myAppSettings.apiPort + myAppSettings.baseApiUrl + url;
        //return `${environment.api}`+this.appSettings[key];
    }

    public generateOption(queryParams, forms?) {
        if (forms) {
            this.headers=new HttpHeaders();
            this.headers = this.headers.set('Accept', '*/*');
        } else {
            this.headers = this.headers.set('Content-Type', 'application/json');
        }
        const token = localStorage.getItem('mean-token');
        this.headers = this.headers.set('Authorization', token);
        const options = {
            params: queryParams,
            headers: this.headers
        };
        return options;
    }

}
