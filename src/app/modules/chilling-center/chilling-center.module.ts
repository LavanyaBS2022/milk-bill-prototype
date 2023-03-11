import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChillingCenterRoutingModule } from './chilling-center-routing.module';
import { AngularMaterialModule } from '../../angular.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MilkCollectionComponent } from './milk-collection/milk-collection.component';
import { MpcsCcPaymentReportComponent } from './mpcs-cc-payment-report/mpcs-cc-payment-report.component';
import { MonthlyCollectionComponent } from './monthly-collection/monthly-collection.component';
import { PaymentCollectionComponent } from './payment-collection/payment-collection.component';
import { BmcClusterComponent } from './bmc-cluster/bmc-cluster.component';
import { PtcListComponent } from './ptc-list/ptc-list.component';
import { PtcVendorComponent } from './ptc-vendor/ptc-vendor.component';
import { PtcTransactionComponent } from './ptc-transaction/ptc-transaction.component';
import { BulkMilkTransferComponent } from './bulk-milk-transfer/bulk-milk-transfer.component';

@NgModule({
  imports: [
    CommonModule,
    ChillingCenterRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [MilkCollectionComponent, MpcsCcPaymentReportComponent, MonthlyCollectionComponent, PaymentCollectionComponent, BmcClusterComponent, PtcListComponent, PtcVendorComponent, PtcTransactionComponent, BulkMilkTransferComponent]
})
export class ChillingCenterModule { }
