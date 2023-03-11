import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { MatPaginator, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-farmers-ledger',
  templateUrl: './farmers-ledger.component.html',
  styleUrls: ['./farmers-ledger.component.scss']
})
export class FarmersLedgerComponent implements OnInit {
  farmersLedgerForm:FormGroup;
  maxDate;
  minDate;
  mpcsList;
  customers;
  ledgerDetails;
  displayedColumns: string[] = ['ledgerDate',
  'Particulars',
  'dr',
  'cr',
  'balance'];
  // customerList;
  // pourerTypes:
  selectedCustomer;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<customer>(ELEMENT_DATA);
  constructor() { }

  ngOnInit() {
    this.farmersLedgerForm = new FormGroup({
      
      fromDate: new FormControl(""),
      toDate: new FormControl(""),
      mpcsName: new FormControl(""),
      customer: new FormControl(""),
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

}

const ELEMENT_DATA: customer[] = [
  {
    ledgerDate:'01-03-23',
    Particulars:'Opening balance @ 01-03-23',
    dr:'-',
    cr:'350.00',
    balance:350.00
  },
  {
    ledgerDate:'01-03-23',
    Particulars:'Morning Cow Milk 2.8 LTR @ 28.3',
    dr:'-',
    cr:'79.24',
    balance:429.24
  },
  {
    ledgerDate:'01-03-23',
    Particulars:'Evening Cow Milk 2.5 LTR @ 28.3',
    dr:'-',
    cr:'70.45',
    balance:499.99
  },
  {
    ledgerDate:'02-03-23',
    Particulars:'Morning Cow Milk 2.8 LTR @ 28.3',
    dr:'-',
    cr:'56.60',
    balance:556.59
  },
  {
    ledgerDate:'02-03-23',
    Particulars:'Evening Cow Milk 2.5 LTR @ 28.3',
    dr:'-',
    cr:'73.58',
    balance:630.17
  },
  {
    ledgerDate:'03-03-23',
    Particulars:'Morning Cow Milk 2.8 LTR @ 28.3',
    dr:'-',
    cr:'70.78',
    balance:700.92
  },
  {
    ledgerDate:'03-03-23',
    Particulars:'Evening Cow Milk 2.5 LTR @ 28.3',
    dr:'-',
    cr:'70.75',
    balance:771.90
  },
  {
    ledgerDate:'04-03-23',
    Particulars:'Morning Cow Milk 2.8 LTR @ 28.3',
    dr:'-',
    cr:'79.70',
    balance:850.80
  },
  {
    ledgerDate:'04-03-23',
    Particulars:'Evening Cow Milk 2.5 LTR @ 28.3',
    dr:'-',
    cr:'70.56',
    balance:920
  },
  {
    ledgerDate:'01-03-23',
    Particulars:'Cattle Feed Purchased Bill No-350',
    dr:'845',
    cr:'-',
    balance:70
  },
];

interface customer{
  ledgerDate:string;
  Particulars:string;
  dr:string;
  cr:string;
  balance:number;
}
