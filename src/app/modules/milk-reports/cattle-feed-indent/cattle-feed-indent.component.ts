import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { MatPaginator, MatTableDataSource } from "@angular/material";

@Component({
  selector: 'app-cattle-feed-indent',
  templateUrl: './cattle-feed-indent.component.html',
  styleUrls: ['./cattle-feed-indent.component.scss']
})
export class CattleFeedIndentComponent implements OnInit {
  farmersLedgerForm:FormGroup;
  maxDate;
  minDate;
  mpcsList;
  customers;
  ledgerDetails;
  displayedColumns: string[] = ['date',
    'customer',
    'packet',
    'qty',
    'amt'];
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
    date:'01-03-23',
    customer:'Customer 1',
    packet:'By-pass Cattle Feed',
    qty:3,
    amt:1500
  },
  {
    date:'03-03-23',
    customer:'Customer 2',
    packet:'By-pass Cattle Feed',
    qty:3,
    amt:1500
  },
  {
    date:'04-03-23',
    customer:'Customer 3',
    packet:'Nandini Gold',
    qty:2,
    amt:1100
  },
  {
    date:'07-03-23',
    customer:'Customer 4',
    packet:'Nandini Gold',
    qty:3,
    amt:1650
  },
  {
    date:'10-03-23',
    customer:'Customer 6',
    packet:'Calf Feed',
    qty:2,
    amt:1200
  },
  {
    date:'10-03-23',
    customer:'Customer 7',
    packet:'Calf Feed',
    qty:2,
    amt:1200
  },
  {
    date:'13-03-23',
    customer:'Customer 7',
    packet:'Calf Feed',
    qty:2,
    amt:1200
  },
  {
    date:'13-03-23',
    customer:'Customer 3',
    packet:'Calf Feed',
    qty:2,
    amt:1200
  },
  
];

interface customer{
  date:string;
  customer:string;
  packet:string;
  qty:number;
  amt:number;
}