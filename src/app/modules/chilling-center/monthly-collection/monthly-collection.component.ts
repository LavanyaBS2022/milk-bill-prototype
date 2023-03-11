import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-monthly-collection',
  templateUrl: './monthly-collection.component.html',
  styleUrls: ['./monthly-collection.component.scss']
})
export class MonthlyCollectionComponent implements OnInit {
  farmersLedgerForm:FormGroup;
  maxDate;
  minDate;
  mpcsList;
  customers;
  montlyCollectionDetails;
  displayedColumns: string[] = [
    'srNo',
    'code',
    'name',
    'totalMilk',
    'totalMilkGood',
    'totalAmountClaimed',
    'totalCattleFeed'
  ];
  // customerList;
  // pourerTypes:
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
    this.montlyCollectionDetails=ELEMENT_DATA;
  }

  get get(){
    return this.farmersLedgerForm.controls;
  }

  onChangeMpcs(mpcsId){
    this.selectedMpcs=this.mpcsList[mpcsId-1];
console.log(mpcsId);
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
  updateMinDate2() {
    this.maxDate = new Date(this.get.toDate.value);
    // console.log("min date",this.minDate )
this.selectedMpcs=1;
    this.minDate.setDate(this.minDate.getDate() + 1);
  }

}

const ELEMENT_DATA: customer[] = [
 {
  srNo:'1',
  code:'844',
  name:'Siddapura',
  
  totalMilk:'2200',
  totalMilkGood:'2000',
  totalAmountClaimed:'8000',
  totalCattleFeed:'200'
 },
 {
  srNo:'2',
  code:'845',
  name:'K. Abtur',
  
  totalMilk:'2600',
  totalMilkGood:'2500',
  totalAmountClaimed:'9000',
  totalCattleFeed:'100'
 },
 {
  srNo:'3',
  code:'846',
  name:'Ranganathpur',
  
  totalMilk:'2000',
  totalMilkGood:'1800',
  totalAmountClaimed:'7500',
  totalCattleFeed:'200'
 },
 {
  srNo:'4',
  code:'847',
  name:'kadanur',
  
  totalMilk:'2200',
  totalMilkGood:'2000',
  totalAmountClaimed:'8000',
  totalCattleFeed:'80'
 },
 
];

interface customer{
  srNo:string;
  code:string;
  name:string;
  totalMilk:string;
  totalMilkGood:string;
  totalAmountClaimed:string;
  totalCattleFeed:string;
}
