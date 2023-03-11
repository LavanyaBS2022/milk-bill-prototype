import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddFarmerComponent } from '../add-farmer/add-farmer.component';


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
const ELEMENT_DATA: PeriodicElement[] = [
  { farmerName: 'Gopal', address: '01,1st cross,kamanahalli', memberOfMPCS:'Y', memberSince:'22-04-2012',activeMember:'Y',activeContributer:'Y',mobile:'9874561230',cows:6,buffello:11},
  { farmerName: 'Ganesh', address: '334,1st cross,horamav', memberOfMPCS:'Y', memberSince:'22-04-2012',activeMember:'Y',activeContributer:'Y',mobile:'7874561440',cows:9,buffello:12},
  { farmerName: 'Suresh', address: '22,1st cross,kamanahalli', memberOfMPCS:'Y', memberSince:'22-04-2012',activeMember:'Y',activeContributer:'Y',mobile:'6678561444',cows:9,buffello:14},
  { farmerName: 'Ram', address: '444,1st cross,kamanahalli', memberOfMPCS:'Y', memberSince:'22-04-2012',activeMember:'Y',activeContributer:'Y',mobile:'9874561236',cows:3,buffello:11},
  { farmerName: 'Vijay', address: '04,1st cross,kamanahalli', memberOfMPCS:'Y', memberSince:'22-04-2012',activeMember:'N',activeContributer:'N',mobile:'8974561277',cows:6,buffello:20},
  { farmerName: 'Guru', address: '21,1st cross,kamanahalli', memberOfMPCS:'Y', memberSince:'22-04-2012',activeMember:'Y',activeContributer:'Y',mobile:'9874564530',cows:3,buffello:22},
  { farmerName: 'Prasad', address: '45,1st cross,kamanahalli', memberOfMPCS:'Y', memberSince:'22-04-2012',activeMember:'Y',activeContributer:'N',mobile:'9874761230',cows:16,buffello:11},
  { farmerName: 'Dhanush', address: '33,1st cross,kamanahalli', memberOfMPCS:'Y', memberSince:'22-04-2012',activeMember:'Y',activeContributer:'Y',mobile:'6674561230',cows:7,buffello:17},
  { farmerName: 'Vignesh', address: '5,2nd cross,kamanahalli', memberOfMPCS:'Y', memberSince:'22-04-2012',activeMember:'Y',activeContributer:'Y',mobile:'7884561230',cows:5,buffello:8},
  { farmerName: 'Kamalesh', address: '42,1st cross,kamanahalli', memberOfMPCS:'Y', memberSince:'22-04-2012',activeMember:'Y',activeContributer:'Y',mobile:'8374561277',cows:4,buffello:12},
  { farmerName: 'Shivam', address: '13,1st cross,kamanahalli', memberOfMPCS:'Y', memberSince:'22-04-2012',activeMember:'N',activeContributer:'N',mobile:'9874561444',cows:16,buffello:9},
  { farmerName: 'Ajay', address: '23,13th cross,kamanahalli', memberOfMPCS:'Y', memberSince:'22-04-2012',activeMember:'Y',activeContributer:'Y',mobile:'9874566550',cows:14,buffello:19},
];

@Component({
  selector: 'app-farmer-master',
  templateUrl: './farmer-master.component.html',
  styleUrls: ['./farmer-master.component.scss']
})
export class FarmerMasterComponent implements OnInit {

  public displayedColumns:string[];
  public dataSource:any;
  constructor(public dialog: MatDialog) {
    this.displayedColumns = ['farmerName', 'address', 'memberOfMPCS','memberSince','activeMember','activeContributer','mobile', 'cows','buffello','Action'];
    this.dataSource = ELEMENT_DATA;
  }
  ngOnInit(): void {
    
  }

  openDialog() :void{
    this.dialog.open(AddFarmerComponent, {
      height: '600px',
      width: '600px',
    });
}

}
