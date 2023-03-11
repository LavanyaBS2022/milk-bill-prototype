import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { Router } from "@angular/router";
import { Common } from "../../service/common/common";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { MastersService } from "../../service/masters/masters.service";
import { DialogOrderWindowComponent } from "../dialog-order-window/dialog-order-window.component";
import { resolve } from "url";

@Component({
  selector: "admin-header",
  templateUrl: "./admin-header.component.html",
})
export class AdminHeaderComponent {
  public config: PerfectScrollbarConfigInterface = {};
  public userDetails: any;
  orderWindowSeasonList: any;
  orderWindowIdSelected: any;
  brandList: any;
  brandId: any;
  // This is for Notifications
  notifications: Object[] = [
    {
      round: "round-danger",
      icon: "ti-link",
      title: "Launch Admin",
      subject: "Just see the my new admin!",
      time: "9:30 AM",
    },
    {
      round: "round-success",
      icon: "ti-calendar",
      title: "Event today",
      subject: "Just a reminder that you have event",
      time: "9:10 AM",
    },
    {
      round: "round-info",
      icon: "ti-settings",
      title: "Settings",
      subject: "You can customize this template as you want",
      time: "9:08 AM",
    },
    {
      round: "round-primary",
      icon: "ti-user",
      title: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:00 AM",
    },
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: "assets/images/users/1.jpg",
      status: "online",
      from: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:30 AM",
    },
    {
      useravatar: "assets/images/users/2.jpg",
      status: "busy",
      from: "Sonu Nigam",
      subject: "I have sung a song! See you at",
      time: "9:10 AM",
    },
    {
      useravatar: "assets/images/users/2.jpg",
      status: "away",
      from: "Arijit Sinh",
      subject: "I am a singer!",
      time: "9:08 AM",
    },
    {
      useravatar: "assets/images/users/4.jpg",
      status: "offline",
      from: "Pavan kumar",
      subject: "Just see the my admin!",
      time: "9:00 AM",
    },
  ];

  constructor(
    private router: Router,
    private common: Common,
    private mastersService: MastersService,
    private dialog: MatDialog
  ) {
    // this.userDetails = this.common.getUserDetails();
  }

  signOut() {
    this.common.logout();
    this.router.navigateByUrl("/login");
  }

  async onOpenOrderWindowDialog() {
    this.userDetails = this.common.getUserDetails();
    this.getBrandList(this.userDetails.franchiseId)
      .then((res: any) => {
        this.generatePopUp();
      })
      .catch((err: any) => {
        this.common.apiError(err);
      });
  }

  public generatePopUp() {
    const onlyActive = 1;
    this.mastersService
      .getOrderWindowSeasonList2(onlyActive, this.userDetails.franchiseId)
      .subscribe(
        (data) => {
          this.orderWindowSeasonList =
            data.data.length > 0
              ? data.data.filter(
                  (o) => o.subsidiary_id == this.userDetails.subsidiary_id
                )
              : [];
          this.openDialog();
        },
        (sError) => {
          this.common.apiError(sError);
        }
      );
  }

  openDialog(): void {
    // console.log(this.orderWindowSeasonList);
    // console.log(this.brandList);
    const dialogRef = this.dialog.open(DialogOrderWindowComponent, {
      disableClose: true,
      width: "600px",
      data: {
        orderWindowSeasonList: this.orderWindowSeasonList,
        orderWindowIdSelected: this.orderWindowIdSelected,
        brandList: this.brandList,
        brandId:
          this.brandList.length == 1
            ? this.brandList[0].brand_id
            : this.brandId,
        isInit: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let filterSelectedData = this.orderWindowSeasonList.filter(
          (item) => item.id == result.orderWindowIdSelected
        );
        let userDetails = this.common.getUserDetails();
        userDetails.orderWindowId = filterSelectedData[0].id;
        userDetails.seasonId = filterSelectedData[0].season_id;
        userDetails.brandId = parseInt(result.brandId);

        userDetails.seasonName = filterSelectedData[0].season_name;
        userDetails.orderWindowName = filterSelectedData[0].name;
        userDetails.orderWindowType = filterSelectedData[0].ow_type;
        userDetails.active_or_not = filterSelectedData[0].active_or_not;
        this.common.setUserDetails(userDetails);
        window.location.reload();
      }
    });
  }

  public getBrandList(franchiseId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.mastersService.getBrandListByFranchiseId(franchiseId, 1).subscribe(
        (sResponseModel) => {
          if (sResponseModel.data) {
            this.brandList = sResponseModel.data;
            this.brandList = [...this.brandList];
            resolve(this.brandList);
            // console.log('getBrandListByFranchiseId', sResponseModel.data);
          }
        },
        (sError) => {
          // console.log('Dashboard Total Order Amount Error', sError);
          reject();
          this.common.apiError(sError);
        }
      );
    });
  }
}
