import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import routing module
import { AppRoutingModule } from './app.routing';
import { AngularMaterialModule } from './angular.material.module';

import { APP_MODULES, APP_COMPONENT, APP_DIR } from './app.import';
// import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MenuItems } from '../app/shared/menu-items/menu-items';
import { LoginComponent } from './modules/login/pages/login/login.component';
import { ConfirmationDialogComponent } from './shared/components';
import { AlertDialogComponent } from './shared/components/alert-dialog/alert-dialog.component';
import { VerifyUserEmailComponent } from './modules/login/components/verify-user-email/verify-user-email.component';
import { ForgotpasswordComponent } from './modules/login/components/forgotpassword/forgotpassword.component';

import { DatePipe } from "@angular/common";
import { DialogOrderWindowComponent } from './shared/components/dialog-order-window/dialog-order-window.component';
import { DialogOrderHistoryComponent } from './shared/components/dialog-order-history/dialog-order-history.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  imports: [
    APP_MODULES,
    AppRoutingModule,
    AngularMaterialModule,
    SharedModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    NgxMatSelectSearchModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      preventDuplicates: true,
    }),

  ],
  declarations: [
    AppComponent,
    APP_COMPONENT,
    APP_DIR,
    // LoginComponent,
    // VerifyUserEmailComponent,
    // ForgotpasswordComponent,
    DialogOrderWindowComponent,
    DialogOrderHistoryComponent,
    
  
    
  ],
  entryComponents: [ConfirmationDialogComponent, AlertDialogComponent, DialogOrderWindowComponent, DialogOrderHistoryComponent],

  exports: [APP_DIR],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    MenuItems,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
