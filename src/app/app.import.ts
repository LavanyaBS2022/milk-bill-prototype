import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {
    LoginModule,
    DashboardModule,
} from './modules';

import { ConfigModule, ConfigLoader } from '@ngx-config/core';
import { ConfigHttpLoader } from '@ngx-config/http-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
export function appConfigFactory(http: HttpClient): ConfigLoader {
    return new ConfigHttpLoader(http, './assets/config/config.json');
}


export const APP_MODULES = [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    // SamplepageModule,
    // MastersModule,
    ConfigModule.forRoot({
        provide: ConfigLoader,
        useFactory: (appConfigFactory),
        deps: [HttpClient]
    }),
    NgxSpinnerModule
];

import { AdminLayoutComponent, FullLayoutComponent, SimpleLayoutComponent } from "./containers";

// Import components
import {
    AppAsideComponent,
    AppBreadcrumbsComponent,
    AppFooterComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppMenuComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    ConfirmationDialogComponent,
    AlertDialogComponent,
    P403Component,
    P404Component,
    P500Component,
} from './shared/components';

export const APP_COMPONENT = [
    AdminLayoutComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    AppAsideComponent,
    AppBreadcrumbsComponent,
    AppFooterComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    AppMenuComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    ConfirmationDialogComponent,
    AlertDialogComponent,
    P403Component,
    P404Component,
    P500Component
];


import { AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective } from '../app/shared/directive';

export const APP_DIR = [
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective,
];