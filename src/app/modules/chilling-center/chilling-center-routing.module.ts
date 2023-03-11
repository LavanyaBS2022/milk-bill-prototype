import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BmcClusterComponent } from './bmc-cluster/bmc-cluster.component';
import { BulkMilkTransferComponent } from './bulk-milk-transfer/bulk-milk-transfer.component';
import { MilkCollectionComponent } from './milk-collection/milk-collection.component';
// import { MilkCollectionComponent } from './milk-collection/milk-collection.component';
import { MonthlyCollectionComponent } from './monthly-collection/monthly-collection.component';
import { MpcsCcPaymentReportComponent } from './mpcs-cc-payment-report/mpcs-cc-payment-report.component';
import { PtcListComponent } from './ptc-list/ptc-list.component';
import { PtcTransactionComponent } from './ptc-transaction/ptc-transaction.component';
import { PtcVendorComponent } from './ptc-vendor/ptc-vendor.component';

const routes: Routes = [
  {path:'day_wise_milk_collection_cc',component:MilkCollectionComponent},
  {path:'mpcs_cc_payment_report',component:MpcsCcPaymentReportComponent},
  
  {path:'monthly_milk_collection_cc',component:MonthlyCollectionComponent},
  {path:'bmc_cluster',component:BmcClusterComponent},

  {path:'ptc_list',component:PtcListComponent},
  {path:'ptcVendor',component:PtcVendorComponent},
  {path:'ptc_transaction',component:PtcTransactionComponent},
  {path:'bulk_milk_transfer', component:BulkMilkTransferComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChillingCenterRoutingModule { }
