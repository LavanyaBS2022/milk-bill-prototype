import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mpcs-list',
  templateUrl: './mpcs-list.component.html',
  styleUrls: ['./mpcs-list.component.scss']
})
export class MpcsListComponent implements OnInit {
  mpcsList:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public seasonList = new MatTableDataSource();
  // public seasonActiveStatus:boolean = false;
  public seasonActiveStatus=[];
  displayedColumns: string[] = ['id','name', 'capacity','total_cow_milk','total_buffalo_milk' ,'Actions'];

  // displayedColumns2: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<any>();
  public data =[];
  constructor(private router:Router) { }

  ngOnInit() {
   this.mpcsList=[{
    id:1,name:'Siddapura',capacity:165,total_cow_milk:750,total_buffalo_milk:300
   },
   {
    id:2,name:'K. Abtur',capacity:140,total_cow_milk:750,total_buffalo_milk:300
   },
   {
    id:3,name:'Ranganathpur',capacity:150,total_cow_milk:750,total_buffalo_milk:300
   },
   {
    id:4,name:'kadanur',capacity:145,total_cow_milk:750,total_buffalo_milk:300
   }]
  }

  milkcollection(id:number){
    this.router.navigate(['/milk/daily_milk_collection_form'],{queryParams:{id:id}});
  }

}

