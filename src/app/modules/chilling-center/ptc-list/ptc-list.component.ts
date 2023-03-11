import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ptc-list',
  templateUrl: './ptc-list.component.html',
  styleUrls: ['./ptc-list.component.scss']
})
export class PtcListComponent implements OnInit {

  public displayedColumns:string[];
  public dataSource:any;
  constructor(public router:Router) {
    this.displayedColumns = ['contractorId', 'contractorName', 'contractorType','aadhar','pan','mobile','routes','Action'];
    this.dataSource = ELEMENT_DATA;
  }

  ngOnInit(): void {
    
  }
  openDialog() :void{
    this.router.navigate(['ptcVendor']);
}

}


export interface PeriodicElement {
  farmerName: string;
  address: string;
  memberOfMPCS:string;
  memberSince:string;
  activeMember:string;
  activeContributer:string
  mobile:string;
  cows:number;
  buffello:number;
}
const ELEMENT_DATA: any[] = [
  {
    contractorId:1,
    contractorName:'Contractor 1', 
    contractorType:'Contract',
    aadhar:'12345678901234',
    pan:'ABCD1234',
    mobile:'1234567890',
    routes:'Route 1,Route 4',
  },
  {
    contractorId:2,
    contractorName:'Contractor 2', 
    contractorType:'Contract',
    aadhar:'12345678901234',
    pan:'ABCD1234',
    mobile:'1234567890',
    routes:'Route 2,Route 5',
  },
  {
    contractorId:3,
    contractorName:'Contractor 3', 
    contractorType:'Contract',
    aadhar:'12345678901234',
    pan:'ABCD1234',
    mobile:'1234567890',
    routes:'Route 3,Route 4',
  }
];