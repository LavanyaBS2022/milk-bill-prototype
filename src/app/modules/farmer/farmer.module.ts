import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmerRoutingModule } from './farmer-routing.module';
import { NotificationComponent } from './notification/notification.component';
import { LedgerComponent } from './ledger/ledger.component';
import { MilkContributionComponent } from './milk-contribution/milk-contribution.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';
import { AngularMaterialModule } from '../../angular.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FarmerRoutingModule,
    AngularMaterialModule,
    // APP_MODULES,
    // BrowserModule,
    // BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [NotificationComponent, LedgerComponent, MilkContributionComponent, PaymentInfoComponent]
})
export class FarmerModule { }
