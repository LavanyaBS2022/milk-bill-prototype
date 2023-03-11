import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-bmc-kendra',
  templateUrl: './bmc-kendra.component.html',
  styleUrls: ['./bmc-kendra.component.scss']
})
export class BmcKendraComponent implements OnInit {
  mpcsList:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  farmersLedgerForm:FormGroup;
  minDate;
  public seasonList = new MatTableDataSource();
  // public seasonActiveStatus:boolean = false;
  public seasonActiveStatus=[];
  displayedColumns: string[] = ['id','name', 'capacity','snf','fat','total_cow_milk','total_buffalo_milk' ];

  // displayedColumns2: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<any>();
  public data =[];
  shifts;
  constructor(private router:Router) { }

  ngOnInit() {
    this.farmersLedgerForm = new FormGroup({
      
      fromDate: new FormControl(""),
      shift: new FormControl(""),
     
    });

    this.shifts=[
      {
      id:1,name:'Morning'
     },
     {
      id:2,name:'Evening'
     },
    ];
   this.mpcsList=[{
    id:1,name:'Siddapura',capacity:165,snf:8.5,fat:4.7,total_cow_milk:750,total_buffalo_milk:300
   },
   {
    id:2,name:'K. Abtur',capacity:140,snf:8.5,fat:4.5,total_cow_milk:750,total_buffalo_milk:300
   },
   {
    id:3,name:'Ranganathpur',capacity:150,snf:8.5,fat:4.3,total_cow_milk:750,total_buffalo_milk:300
   },
   {
    id:4,name:'kadanur',capacity:145,snf:8.5,fat:4.7,total_cow_milk:750,total_buffalo_milk:300
   }];
   this.get.fromDate.patchValue(new Date());
   this.get.shift.patchValue(1);
  }

  milkcollection(id:number){
    this.router.navigate(['/milk/daily_milk_collection_form'],{queryParams:{id:id}});
  }

  get get(){
    return this.farmersLedgerForm.controls;
  }

  updateMinDate() {
    this.minDate = new Date(this.get.fromDate.value);
    // console.log("min date",this.minDate )

    this.minDate.setDate(this.minDate.getDate() + 1);
  }

}


