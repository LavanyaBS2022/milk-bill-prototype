import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CattleFeedIndentComponent } from "./cattle-feed-indent/cattle-feed-indent.component";
import { CattleFeedPlantIndentComponent } from "./cattle-feed-plant-indent/cattle-feed-plant-indent.component";
import { DailyMilkCollectionFormComponent } from "./daily-milk-collection-form/daily-milk-collection-form.component";
import { FarmerMasterComponent } from "./farmer-master/farmer-master.component";
import { MpcsListComponent } from "./mpcs-list/mpcs-list.component";

const milkRoutes: Routes = [
  {
    path: "daily_milk_collection_form",
    component: DailyMilkCollectionFormComponent,
  },
  { path: "mpcs_list", component: MpcsListComponent },
  { path: "cattle_feed_billing", component: CattleFeedIndentComponent },
  { path: "farmer_master", component: FarmerMasterComponent },
  { path: "cattle_feed_indent", component: CattleFeedPlantIndentComponent },

  // { path: 'verify-user-email/:base64Email', component: VerifyUserEmailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(milkRoutes)],
  exports: [RouterModule],
})
export class MilkRoutingModule {}
