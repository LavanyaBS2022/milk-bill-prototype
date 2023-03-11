import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Common } from '../../service/common/common';
import { OrdersService } from '../../service/orders/orders.service';

@Component({
  selector: 'app-dialog-order-history',
  templateUrl: './dialog-order-history.component.html',
  styleUrls: ['./dialog-order-history.component.scss']
})
export class DialogOrderHistoryComponent implements OnInit {
  private orderId;
  public orderList: any = [];
  constructor(
    public dialogRef: MatDialogRef<DialogOrderHistoryComponent>,
    private orderSrv: OrdersService,
    @Inject(MAT_DIALOG_DATA) public data: any, public router: Router, public common: Common,

  ) {
    //  console.log(data);
    //    this.orderId = data;
    console.log(data);

    this.orderList = data


  }

  ngOnInit() {
    //  this.getOrderStatusHistoryList()
  }


  getOrderStatusHistoryList() {
    this.orderSrv.getOrderHistoryStatus(this.orderId).subscribe((sResponse: any) => {
      this.orderList = sResponse.data
    }, sError => {

    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}
