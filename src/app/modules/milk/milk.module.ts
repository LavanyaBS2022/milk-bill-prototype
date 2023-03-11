import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyMilkCollectionFormComponent } from './daily-milk-collection-form/daily-milk-collection-form.component';
import { MilkRoutingModule } from './milk.routing.module';
import { AngularMaterialModule } from '../../angular.material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MpcsListComponent } from './mpcs-list/mpcs-list.component';
import { CattleFeedIndentComponent } from './cattle-feed-indent/cattle-feed-indent.component';
import { AddFarmerComponent } from './add-farmer/add-farmer.component';
import { FarmerMasterComponent } from './farmer-master/farmer-master.component';
import { CattleFeedPlantIndentComponent } from './cattle-feed-plant-indent/cattle-feed-plant-indent.component';
@NgModule({
  imports: [
    CommonModule,
    MilkRoutingModule,
    AngularMaterialModule,
    // APP_MODULES,
    // BrowserModule,
    // BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  entryComponents:[AddFarmerComponent],
  declarations: [DailyMilkCollectionFormComponent,MpcsListComponent,CattleFeedIndentComponent,AddFarmerComponent,FarmerMasterComponent,CattleFeedPlantIndentComponent]
})
export class MilkModule { }
