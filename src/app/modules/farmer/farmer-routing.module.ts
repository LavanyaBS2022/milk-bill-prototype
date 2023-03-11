import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LedgerComponent } from './ledger/ledger.component';
import { MilkContributionComponent } from './milk-contribution/milk-contribution.component';
import { NotificationComponent } from './notification/notification.component';
import { PaymentInfoComponent } from './payment-info/payment-info.component';

const routes: Routes = [
  {
    path:'farmer_ledger',
    component:LedgerComponent
  },
  {
    path:'notification',
    component:NotificationComponent
  },
  {
    path:'payment_info',
    component:PaymentInfoComponent
  },
  {
    path:'milk_contribution',
    component:MilkContributionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmerRoutingModule { }
