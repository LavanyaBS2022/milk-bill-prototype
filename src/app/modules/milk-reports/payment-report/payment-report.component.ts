import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.scss']
})
export class PaymentReportComponent implements OnInit {
  farmersLedgerForm:FormGroup;
  maxDate;
  minDate;
  mpcsList;
  customers;
  ledgerDetails;
  displayedColumns: string[] = [
  'slNo',
  'name',
  'bankName',
  'bankAccNo',
  'ifsc',
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
    name:'Customer 1',
    bankName:'HDCC KONANUR',
    bankAccNo:'99009009009990',
    ifsc:'YESB090100',
    liters:65,
    payment:800,
  },
  {
    slNo:2,
    name:'Customer 2',
    bankName:'HDCC KONANUR',
    bankAccNo:'99009009009991',
    ifsc:'YESB090100',
    liters:89,
    payment:1000,
  },
  {
    slNo:3,
    name:'Customer 3',
    bankName:'HDCC KONANUR',
    bankAccNo:'99009009009992',
    ifsc:'YESB090100',
    liters:145,
    payment:1670,
  },
  {
    slNo:4,
    name:'Customer 4',
    bankName:'HDCC KONANUR',
    bankAccNo:'99009009009993',
    ifsc:'YESB090100',
    liters:189,
    payment:2200,
  },
  {
    slNo:5,
    name:'Customer 5',
    bankName:'HDCC KONANUR',
    bankAccNo:'99009009009994',
    ifsc:'YESB090100',
    liters:199,
    payment:2500,
  },
  {
    slNo:6,
    name:'Customer 6',
    bankName:'HDCC KONANUR',
    bankAccNo:'99009009009995',
    ifsc:'YESB090100',
    liters:199,
    payment:2500,
  },
  {
    slNo:7,
    name:'Customer 7',
    bankName:'HDCC KONANUR',
    bankAccNo:'99009009009996',
    ifsc:'YESB090100',
    liters:199,
    payment:2500,
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
  bankName:string,
  bankAccNo:string,
  ifsc:string,
  liters:number,
  payment:number,
}