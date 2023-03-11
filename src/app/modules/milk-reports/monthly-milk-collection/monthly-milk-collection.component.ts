import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { MatPaginator, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-monthly-milk-collection',
  templateUrl: './monthly-milk-collection.component.html',
  styleUrls: ['./monthly-milk-collection.component.scss']
})
export class MonthlyMilkCollectionComponent implements OnInit {

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
    'sc',
    'st',
    'others',
    'gender',
    'benificaryId',
    'totalMilk',
    'totalMilkGood',
    'totalAmountClaimed',
    'aadhar',
    'bankName',
    'ifscCode',
    'aadharNo',
    'mobileNo',
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

    this.minDate.setDate(this.minDate.getDate() + 1);
  }

}

const ELEMENT_DATA: customer[] = [
 {
  srNo:'1',
  code:'844',
  name:'Customer 1',
  sc:'',
  st:'',
  others:'yes',
  gender:'Male',
  benificaryId:'5',
  totalMilk:'155',
  totalMilkGood:'132',
  totalAmountClaimed:'630',
  aadhar:'12345678901234',
  bankName:'HDCC KONANUR',
  ifscCode:'HDCC123456',
  aadharNo:'012345678890',
  mobileNo:'1234567890',
 },
 {
  srNo:'2',
  code:'844',
  name:'Customer 2',
  sc:'',
  st:'',
  others:'yes',
  gender:'Male',
  benificaryId:'12',
  totalMilk:'100',
  totalMilkGood:'85',
  totalAmountClaimed:'555',
  aadhar:'12345678901234',
  bankName:'HDCC KONANUR',
  ifscCode:'HDCC123456',
  aadharNo:'012345678890',
  mobileNo:'1234567890',
 },
 {
  srNo:'3',
  code:'844',
  name:'Customer 3',
  sc:'',
  st:'',
  others:'yes',
  gender:'Female',
  benificaryId:'44',
  totalMilk:'155',
  totalMilkGood:'132',
  totalAmountClaimed:'630',
  aadhar:'12345678901234',
  bankName:'HDCC KONANUR',
  ifscCode:'HDCC123456',
  aadharNo:'012345678890',
  mobileNo:'1234567890',
 },
 {
  srNo:'4',
  code:'844',
  name:'Customer 4',
  sc:'',
  st:'',
  others:'yes',
  gender:'Male',
  benificaryId:'9',
  totalMilk:'211',
  totalMilkGood:'148',
  totalAmountClaimed:'605',
  aadhar:'12345678901234',
  bankName:'HDCC KONANUR',
  ifscCode:'HDCC123456',
  aadharNo:'012345678890',
  mobileNo:'1234567890',
 },
 {
  srNo:'5',
  code:'844',
  name:'Customer 5',
  sc:'',
  st:'',
  others:'yes',
  gender:'Male',
  benificaryId:'5',
  totalMilk:'155',
  totalMilkGood:'132',
  totalAmountClaimed:'630',
  aadhar:'12345678901234',
  bankName:'HDCC KONANUR',
  ifscCode:'HDCC123456',
  aadharNo:'012345678890',
  mobileNo:'1234567890',
 },
 {
  srNo:'6',
  code:'844',
  name:'Customer 6',
  sc:'',
  st:'',
  others:'yes',
  gender:'Male',
  benificaryId:'5',
  totalMilk:'155',
  totalMilkGood:'132',
  totalAmountClaimed:'630',
  aadhar:'12345678901234',
  bankName:'HDCC KONANUR',
  ifscCode:'HDCC123456',
  aadharNo:'012345678890',
  mobileNo:'1234567890',
 },
 {
  srNo:'7',
  code:'844',
  name:'Customer 7',
  sc:'',
  st:'',
  others:'yes',
  gender:'Male',
  benificaryId:'5',
  totalMilk:'155',
  totalMilkGood:'132',
  totalAmountClaimed:'630',
  aadhar:'12345678901234',
  bankName:'HDCC KONANUR',
  ifscCode:'HDCC123456',
  aadharNo:'012345678890',
  mobileNo:'1234567890',
 },
];

interface customer{
  srNo:string;
  code:string;
  name:string;
  sc:string;
  st:string;
  others:string;
  gender:string;
  benificaryId:string;
  totalMilk:string;
  totalMilkGood:string;
  totalAmountClaimed:string;
  aadhar:string;
  bankName:string;
  ifscCode:string;
  aadharNo:string;
  mobileNo:string;
}
