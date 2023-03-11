import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-bmc-cluster',
  templateUrl: './bmc-cluster.component.html',
  styleUrls: ['./bmc-cluster.component.scss']
})
export class BmcClusterComponent implements OnInit {

  public displayedColumns:string[];
  public dataSource:any;
  constructor(public dialog: MatDialog) {
    this.displayedColumns = ['Taluka', 'ClusterName', 'BMCCount','MPCSCount','RouteLength','BMCNames','Action'];
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
  Taluka: string;
  ClusterName: string;
  BMCCount: number;
  MPCSCount: number;
  RouteLength: number;
  BMCNames: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Taluka: 'SORABA', ClusterName: 'SORABA CLUSTER', BMCCount:5, MPCSCount:41,RouteLength:80,BMCNames:'AGASANAHALLI,CHIKKA IDAGODU,HIREIDAGODU,KODIHALLI,NALLIKOPPA'},
  {Taluka: 'SHIMOGA', ClusterName: 'SHIMOGA CLUSTER-1', BMCCount: 5, MPCSCount:25,RouteLength:60,BMCNames:''},
  {Taluka: 'BHADRAVATHI', ClusterName: 'BHADRAVATHI CLUSTER-1', BMCCount:8, MPCSCount: 40,RouteLength:50,BMCNames:''},
  {Taluka: 'SAGARA', ClusterName: 'SAGARA CLUSTER', BMCCount:4, MPCSCount:20,RouteLength:45,BMCNames:''},
  {Taluka: 'THIRTAHALLI', ClusterName: 'THIRTHAHALLI CLUSTER', BMCCount:9, MPCSCount:45,RouteLength:50,BMCNames:''},
];
