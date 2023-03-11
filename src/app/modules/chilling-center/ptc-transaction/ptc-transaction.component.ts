import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-ptc-transaction',
  templateUrl: './ptc-transaction.component.html',
  styleUrls: ['./ptc-transaction.component.scss']
})
export class PtcTransactionComponent implements OnInit {

  maxDate;
  minDate;
  
  public displayedColumns:string[];
  public dataSource:any;
  public dataSource2:any;

  farmersLedgerForm: any;
  constructor(public dialog: MatDialog) {
    this.displayedColumns = ['RouteName', 'ContractorName', 'VehicleNo','Rate','RouteLength','TotalDist','TotalPTC','Action'];
     this.dataSource = ELEMENT_DATA;
  }
  // openDialog() :void{
  //   this.dialog.open(DialogEx2Component,
  //     {height: '600px',
  //   width: '600px',});
  // }


  ngOnInit(): void {
  }

 
}



export interface PeriodicElement {
  RouteName: string;
  ContractorName: string;
  VehicleNo: number;
  Rate: number;
  RouteLength: number;
  TotalDist: number;
  TotalPTC:number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {RouteName: 'SORABA', ContractorName: 'SORABA CLUSTER', VehicleNo:5, Rate:41,RouteLength:80,TotalDist:5,TotalPTC:400000},
  {RouteName: 'SHIMOGA', ContractorName: 'SHIMOGA CLUSTER-1', VehicleNo: 5, Rate:25,RouteLength:60,TotalDist:5,TotalPTC:400000},
  {RouteName: 'BHADRAVATHI', ContractorName: 'BHADRAVATHI CLUSTER-1', VehicleNo:8, Rate: 40,RouteLength:50,TotalDist:5,TotalPTC:400000},
  {RouteName: 'SAGARA', ContractorName: 'SAGARA CLUSTER', VehicleNo:4, Rate:20,RouteLength:45,TotalDist:5,TotalPTC:400000},
  {RouteName: 'THIRTAHALLI', ContractorName: 'THIRTHAHALLI CLUSTER', VehicleNo:9, Rate:45,RouteLength:50,TotalDist:5,TotalPTC:400000},
];