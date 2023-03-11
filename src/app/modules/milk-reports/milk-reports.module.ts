import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MilkReportsRoutingModule } from './milk-reports-routing.module';
import { DailyMilkCollectionComponent } from './daily-milk-collection/daily-milk-collection.component';
import { FarmersLedgerComponent } from './farmers-ledger/farmers-ledger.component';
import { PaymentReportComponent } from './payment-report/payment-report.component';
import { BmcKendraComponent } from './bmc-kendra/bmc-kendra.component';
import { MonthlyMilkCollectionComponent } from './monthly-milk-collection/monthly-milk-collection.component';
import { AngularMaterialModule } from '../../angular.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CattleFeedIndentComponent } from './cattle-feed-indent/cattle-feed-indent.component';
import { CattleFeedPlantIndentComponent } from '../milk/cattle-feed-plant-indent/cattle-feed-plant-indent.component';
@NgModule({
  imports: [
    CommonModule,
    MilkReportsRoutingModule,
    AngularMaterialModule,
    // APP_MODULES,
    // BrowserModule,
    // BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [DailyMilkCollectionComponent, FarmersLedgerComponent, PaymentReportComponent, BmcKendraComponent, MonthlyMilkCollectionComponent, CattleFeedIndentComponent]
})
export class MilkReportsModule { }
