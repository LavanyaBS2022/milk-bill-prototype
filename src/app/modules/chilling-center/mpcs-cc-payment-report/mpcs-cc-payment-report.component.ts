import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-mpcs-cc-payment-report',
  templateUrl: './mpcs-cc-payment-report.component.html',
  styleUrls: ['./mpcs-cc-payment-report.component.scss']
})
export class MpcsCcPaymentReportComponent implements OnInit {

  farmersLedgerForm:FormGroup;
  maxDate;
  minDate;
  mpcsList;
  customers;
  ledgerDetails;
  displayedColumns: string[] = [
  'slNo',
  'name',
  
  'liters',
  'payment'];
  // customerList;
  // pourerTypes:
  selectedCustomer;
  fromDate:any;
  toDate:any;
  selectedMpcs;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<customer>(ELEMENT_DATA);
  constructor() { }

  ngOnInit() {
    this.farmersLedgerForm = new FormGroup({
      
      fromDate: new FormControl(""),
      toDate: new FormControl(""),
      mpcsName: new FormControl(""),
     
    });
    this.mpcsList=[{
      id:1,name:'Siddapura',capacity:165
     },
     {
      id:2,name:'K. Abtur',capacity:140
     },
     {
      id:3,name:'Ranganathpur',capacity:150
     },
     {
      id:4,name:'kadanur',capacity:145
     }];
     this.customers=[{
      id:1,name:'Customer 1',
     },
     {
      id:2,name:'Customer 2',
     },
     {
      id:3,name:'Customer 3',
     },
     {
      id:4,name:'Customer 4',
     },
     {
      id:5,name:'Customer 5',
     },
     {
      id:6,name:'Customer 6',
     }
    ];
    this.ledgerDetails=ELEMENT_DATA;
  }

  get get(){
    return this.farmersLedgerForm.controls;
  }

  updateMinDate2(){
    this.selectedMpcs=1;
  }

  onCustomer(customerId){
    this.selectedCustomer=this.customers[customerId-1];
console.log(customerId);
  }

  updateMaxDate() {
    this.maxDate = new Date(this.get.fromDate.value);

    this.maxDate.setDate(this.maxDate.getDate() - 1);
  }
  updateMinDate() {
    this.minDate = new Date(this.get.fromDate.value);
    // console.log("min date",this.minDate )

    this.minDate.setDate(this.minDate.getDate() + 1);
  }

  onMpcsChanged(id){
    this.selectedMpcs=this.mpcsList[id-1];
  }

}

const ELEMENT_DATA: customer[] = [
  {
    slNo:1,
    name:'Siddapura',
   
    liters:2000,
    payment:8000,
  },
  {
    slNo:2,
    name:'K. Abtur',
   
    liters:2500,
    payment:9000,
  },
  {
    slNo:3,
    name:'Ranganathpur',
    
    liters:1800,
    payment:7500,
  },
  {
    slNo:4,
    name:'kadanur',
   
    liters:2000,
    payment:8000,
  },
  
 
];

interface customer{
  // ledgerDate:string;
  // Particulars:string;
  // dr:string;
  // cr:string;
  // balance:number;
  slNo:number,
  name:string,
  liters:number,
  payment:number,
}
