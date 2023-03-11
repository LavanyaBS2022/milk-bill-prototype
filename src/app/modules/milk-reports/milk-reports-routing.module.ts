import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BmcKendraComponent } from './bmc-kendra/bmc-kendra.component';
import { CattleFeedIndentComponent } from './cattle-feed-indent/cattle-feed-indent.component';
import { DailyMilkCollectionComponent } from './daily-milk-collection/daily-milk-collection.component';
import { FarmersLedgerComponent } from './farmers-ledger/farmers-ledger.component';
import { MonthlyMilkCollectionComponent } from './monthly-milk-collection/monthly-milk-collection.component';
import { PaymentReportComponent } from './payment-report/payment-report.component';

const routes: Routes = [
  {
    path:'daily_milk_collection',
    component:DailyMilkCollectionComponent
  },
  {
    path:'monthly_milk_collection',
    component:MonthlyMilkCollectionComponent
  },
  {
    path:'payment_report',
    component:PaymentReportComponent
  },
  {
    path:'bmc_kendra_report',
    component:BmcKendraComponent
  },
  {
    path:'farmers_report',
    component:FarmersLedgerComponent
  },
  {
    path:'cattle_feed_report',
    component:CattleFeedIndentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MilkReportsRoutingModule { }
