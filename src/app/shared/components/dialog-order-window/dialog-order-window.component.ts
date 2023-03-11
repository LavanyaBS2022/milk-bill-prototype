import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Common } from '../../service/common/common';
import { Location } from '@angular/common';
import { MastersService } from '../../service/masters/masters.service';

@Component({
  selector: 'app-dialog-order-window',
  templateUrl: './dialog-order-window.component.html',
  styleUrls: ['./dialog-order-window.component.scss']
})
export class DialogOrderWindowComponent {


  constructor(
    public dialogRef: MatDialogRef<DialogOrderWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public router: Router, public common: Common, private location: Location,

  ) {

    console.log(data);

  }

  onNoClick(): void {
    this.dialogRef.close();
    
    if (this.data.isInit) {
      console.log('Im at dialog order window with some data',this.data)
      this.common.logout();
      this.router.navigateByUrl("/login");
    }

  }




}
