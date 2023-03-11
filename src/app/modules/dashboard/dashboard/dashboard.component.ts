import { Component, OnInit, Inject } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatTabChangeEvent,
} from "@angular/material";
import { DashboardService } from "../../../shared/service/dashboard/dashboard.service";
import { MastersService } from "../../../shared/service/masters/masters.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Common } from "./../../../shared/service/common/common";
import { ReportsService } from "../../../shared/service/reports/reports.service";
import * as _ from "lodash";
import { saveAs } from "file-saver";
import { HttpParams } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { DialogOrderWindowComponent } from "../../../shared/components/dialog-order-window/dialog-order-window.component";
import { NgxSpinnerService } from "ngx-spinner";
import { parse } from "querystring";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component_test.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public seasonId: any;
  public orderWindowId: any;
  public orderStatus: any;
  public totalOrderAmount: any;
  public totalNoOfFranchisee: number;
  public totalArticles: number;
  public totalOrderQty: any;
  public orderByFranchiseeTypeData = [];
  public category1WiseTotalOrderData = [];
  public orderByGenderData = [];
  public orderByCountryData = [];
  public orderByTop5MoqArticleData = [];
  public orderByTop5GenderwiseData = [];
  public totalOrderbyMen: any;
  public totalOrderbyWomen: any;
  public totalOrderbyUnisex: any;
  public totalOrderbyKids: any;
  // Pie
  public pieChartLabels: string[] = [];
  public pieChartData: any[] = [];
  public pieChartType = "pie";
  // bar chart
  public barChartLabels: string[] = [];
  public barChartData: any[] = [];
  public barChartType = "bar";
  public barChartLegend = true;
  // Order by Country PIE Chart
  public pieChartOrderbyCountryLabels: string[] = [];
  public pieChartOrderbyCountryData: any = [];
  public pieChartOrderbyCountryType = "pie";
  // Order by Gender PIE chart
  public pieChartOrderbyGenderLabels: string[] = [];
  public pieChartOrderbyGenderData: any = [];
  public pieChartOrderbyGenderType = "pie";
  // Horizontal bar chart
  public hBarTop5MoqArticleChartLabels: string[] = [];
  public hBarTop5MoqArticleChartData: any[] = [];
  public horizontalBarChartType = "line";
  public horizontalBarChartLegend = true;

  public hBarTop5MenChartData: any = [];
  public hBarTop5MenChartDataApeq: any = [];
  public hBarTop5WomenChartData: any = [];
  public hBarTop5WomenChartDataApeq: any = [];
  public hBarTop5UnisexChartData: any = [];
  public hBarTop5UnisexChartDataApeq: any = [];
  public hBarTop5KidsChartData: any = [];

  public hBarTop5MenChartLabels: string[] = [];
  public hBarTop5MenChartLabelsApeq: string[] = [];
  public hBarTop5WomenChartLabels: string[] = [];
  public hBarTop5WomenChartLabelsApeq: string[] = [];
  public hBarTop5UnisexChartLabels: string[] = [];
  public hBarTop5UnisexChartLabelsApeq: string[] = [];
  public hBarTop5KidsChartLabels: string[] = [];
  public orderWindowSeasonList = [];
  public orderWindowIdSelected: any;
  public userDetails;

  public boolBarChartData: boolean = false;
  public boolPieChartData: boolean = false;
  public boolPieChartOrderbyCountryData: boolean = false;
  public boolPieChartOrderbyGender: boolean = false;
  public hBarboolTop5MoqArticleChartData: boolean = false;
  public hBarboolTop5MenChartData: boolean = true;
  public hBarboolTop5MenChartDataApeq: boolean = true;
  public hBarboolTop5WomenChartData: boolean = true;
  public hBarboolTop5WomenChartDataApeq: boolean = true;
  public hBarboolTop5UnisexChartData: boolean = false;
  public hBarboolTop5UnisexChartDataApeq: boolean = false;
  public hBarboolTop5KidsChartData: boolean = false;
  public brandList = [];
  public monthList: any = [];
  public monthListKeyst: any = [];
  public seasonData: any;

  public brandId;
  public franchiseId: any;
  public roleId;
  public userId;
  selectedCountry: any;
  public orderWindowType: any;

  public labelCustomerStore: string;

  // for reports
  public activityreports: any = [];
  public activityReportsKeys: any = [];
  public monthlyReports: any = [];
  public orderSummary: any = [];
  public cloneOrderSummary: any = [];
  public orderAnalysis: any = [];
  public countries: any = [];
  public genderFlex: any = "";
  public franchiseList: any;

  public seasonalOrderData: any = [];
  public categoryOrderdata: any = [];
  public seasonalOrderComparision: any = [];
  public categoryOrderdataComparision: any = [];
  public seasonName;
  public divisionGenderData: any = [];
  public divisionList: any = [];
  public genderList: any = [];
  public gropupBYgenderCur: any = [];
  public gropupBYgenderPrev: any = [];
  public logUser: any;
  public catgoryCurSeasondata: any = [];
  public catgoryPrevSeasondata: any = [];
  public cateogoryList: any = [];
  public genderCurSeasondata: any = [];
  public genderPrevSeasondata: any = [];
  public seasonList: any = [];

  public prevseasonId;
  public curseasonId;
  public seasonForm: FormGroup;
  public prevseasonNewId;
  public curseasonNewId;
  public selectedCountryList = [];

  public orderBycountryList = [];
  public categoryOrdersBycountry = [];
  public genderordersBycountry = [];
  public adminDivisionwiseGender = [];
  public adminmonthlyReports = [];
  public adminstoreOrders = [];
  public sumCategory = 0;
  public prevCount = 0;
  public seasonCustomerForm: FormGroup;
  public channelList: [];
  public storeList: [];
  public activitySeason: any;
  public activityCountry: any;
  public orderSumarrySeason: any;
  public userType = 0;
  todayMilkQty;
  todayLowSnf;
  monthlyGoodQty;
  monthlyLowSnf;
  public selectedChannel1: any;
  public selectedStoreType1: any;
  public amountvarince: any;
  public quantityvarince: any;
  constructor(
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public dashboardService: DashboardService,
    public router: Router,
    private mastersService: MastersService,
    public dialog: MatDialog,
    public common: Common,
    public reportSrv: ReportsService,
    private datePipe: DatePipe,
    private masterService: MastersService,
    private spinner: NgxSpinnerService
  ) {
    this.seasonForm = this.formBuilder.group({
      // franchiseName: ['', Validators.required],
      prevseasonNewId: [""],
      curseasonNewId: [""],
      selectedCountryList: ["0"],
      selectedChannel: [0],
      selectedStoreType: [0],
    });

    this.userType = common.getLocalStorage("userType");
    if (this.userType == 1) {
      this.todayMilkQty = 2000;
      this.todayLowSnf = 500;
      this.monthlyGoodQty = 60000;
      this.monthlyLowSnf = 7500;
    } else if (this.userType == 2) {
      this.todayMilkQty = 20000;
      this.todayLowSnf = 2000;
      this.monthlyGoodQty = 160000;
      this.monthlyLowSnf = 17500;
    } else if (this.userType == 3) {
      this.todayMilkQty = 10;
      this.todayLowSnf = 0;
      this.monthlyGoodQty = 500;
      this.monthlyLowSnf = 5;
    }

    if (this.userType == 1) {
      this.hBarTop5MenChartData = [
        {
          data: [
            612, 625, 630, 612, 618, 612, 612, 625, 630, 612, 618, 612, 599,
            595, 608, 612, 605, 612, 617, 612, 620, 618, 630, 630, 632, 635,
            622, 628, 625, 612, 614,
          ],
          label: "Morning Qty",
        },
        {
          data: [
            717, 708, 717, 725, 704, 717, 714, 699, 717, 714, 711, 717, 717,
            710, 717, 709, 717, 708, 717, 724, 705, 706, 707, 712, 714, 715,
            718, 706, 707, 711, 717,
          ],
          label: "Evening Qty",
        },
        {
          data: [
            1329, 1333, 1347, 1337, 1322, 1329, 1326, 1324, 1347, 1326, 1329,
            1329, 1316, 1305, 1325, 1321, 1322, 1320, 1334, 1336, 1325, 1324,
            1337, 1342, 1346, 1350, 1340, 1334, 1332, 1323, 1331,
          ],
          label: "Total Qty",
        },
      ];
    } else if (this.userType == 3) {
      this.hBarTop5MenChartData = [
        {
          data: [
            3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5,
            3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5,
            3.5, 3.5, 3.5, 3.5, 3.5,
          ],
          label: "Morning Qty",
        },
        {
          data: [
            2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5,
            2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5,
            2.5, 2.5, 2.5, 2.5, 2.5,
          ],
          label: "Evening Qty",
        },
        {
          data: [
            6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
            6, 6, 6, 6, 6, 6, 6, 6,
          ],
          label: "Total Qty",
        },
      ];
    } else {
      this.hBarTop5MenChartData = [
        {
          data: [
            60000, 60000, 60000, 60000, 60000, 60000, 60000, 60000, 60000,
            60000, 60000, 60000, 60000, 60000, 60000, 60000, 60000, 60000,
            60000, 60000, 60000, 60000, 60000, 60000, 60000, 60000, 60000,
            60000, 60000, 60000, 60000,
          ],
          label: "Morning Qty",
        },
        {
          data: [
            40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000,
            40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000,
            40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000, 40000,
            40000, 40000, 40000, 40000,
          ],
          label: "Evening Qty",
        },
        {
          data: [
            100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000,
            100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000,
            100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000,
            100000, 100000, 100000, 100000, 100000, 100000, 100000,
          ],
          label: "Total Qty",
        },
      ];
    }

    this.hBarTop5MenChartDataApeq = [
      {
        data: [
          4.1, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1,
          4.1, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1, 4.1,
          4.1, 4.1, 4.1,
        ],
        label: "FAT Percentage",
      },
      {
        data: [
          8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5,
          8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5, 8.5,
          8.5, 8.5, 8.5,
        ],
        label: "SNF Percentage",
      },
    ];
    this.hBarTop5MenChartLabels = [
      "01-Feb-23",
      "02-Feb-23",
      "03-Feb-23",
      "04-Feb-23",
      "05-Feb-23",
      "06-Feb-23",
      "07-Feb-23",
      "08-Feb-23",
      "09-Feb-23",
      "10-Feb-23",
      "11-Feb-23",
      "12-Feb-23",
      "13-Feb-23",
      "14-Feb-23",
      "15-Feb-23",
      "16-Feb-23",
      "17-Feb-23",
      "18-Feb-23",
      "19-Feb-23",
      "20-Feb-23",
      "21-Feb-23",
      "23-Feb-23",
      "23-Feb-23",
      "24-Feb-23",
      "25-Feb-23",
      "26-Feb-23",
      "27-Feb-23",
      "28-Feb-23",
    ];
if(this.userType==1){
    this.hBarTop5WomenChartData = [
      { data: [400, 350, 200, 185], label: "Qty(Ltrs)" },
      { data: [4.5, 4.5, 4.5, 4.5], label: "FAT Percentage" },
      { data: [8.53, 8.53, 8.53, 8.5], label: "SNF Percentage" },
    ];
    this.hBarTop5WomenChartLabels = [
      "Swamy Gowda",
      "Rangaswamy",
      "Nagendra",
      "Shivanna",
    ];
  }else if(this.userType==2){
    this.hBarTop5WomenChartData = [
      { data: [20000, 18900, 18000, 17600], label: "Qty(Ltrs)" },
      { data: [4.5, 4.5, 4.5, 4.5], label: "FAT Percentage" },
      { data: [8.53, 8.53, 8.53, 8.5], label: "SNF Percentage" },
    ];
    this.hBarTop5WomenChartLabels = [
      "Siddapura",
      "K. Abtur",
      "Ranganathpur",
      "kadanur",
    ];
  }else{
    this.hBarTop5WomenChartData=[];
    this.hBarTop5WomenChartLabels=[];
  }
    // this.selectedChannel1 = 0;
    // this.selectedStoreType1 = 0;
    // this.activityCountry = 0;
    // this.selectedCountry = 0;
    // this.route.queryParams.subscribe((params) => {
    //   this.prevseasonNewId = 2;
    //   this.curseasonNewId = 3;
    //   // this.seasonId = (atob(params.seasonId));  //Need to UnComment after OrderWindow form
    //   // this.orderWindowId = (atob(params.orderWindowId));
    //   // this.orderStatus = (atob(params.orderStatus));
    //   // this.orderStatus = 1;
    //   // this.userDetails = this.common.getUserDetails();
    //   this.getDivisionList();
    //   this.getGenderList();
    //   this.getCategoryList();
    //   this.getSeasonList();
    //   this.getCountryList();
    //   // this.franchiseList = this.userDetails.sales_customer.length > 0 ? this.userDetails.sales_customer.toString() : '';
    //   if (this.userDetails.userType == 1) {
    //     this.genderFlex = 33;
    //   } else {
    //     this.genderFlex = 50;
    //   }
    //   // console.log('this.userDetails', this.userDetails);

    //   // if (this.userDetails.franchiseId > 0 && !this.userDetails.seasonId && !this.userDetails.orderWindowId) {
    //   if (
    //     this.userDetails.franchiseId > 0 &&
    //     !this.userDetails.seasonId &&
    //     !this.userDetails.orderWindowId
    //   ) {
    //     // this.getBrandList(this.userDetails.franchiseId);
    //     this.generatePopUp();

    //     //set to userDeatils
    //     this.mastersService
    //       .getlistFranchiseById(this.userDetails.franchiseId)
    //       .subscribe(
    //         (data) => {
    //           // let userDetails = this.common.getUserDetails();
    //           userDetails.countryId = data.data[0].country_id;
    //           userDetails.accessPriority = data.data[0].franchise_type;
    //           userDetails.franchiseDetails = data.data[0];
    //           // console.log("user details", userDetails);
    //           this.common.setUserDetails(userDetails);
    //         },
    //         (sError) => {
    //           this.common.apiError(sError);
    //         }
    //       );
    //   } else if (
    //     this.userDetails.franchiseId > 0 &&
    //     this.userDetails.seasonId &&
    //     this.userDetails.orderWindowId &&
    //     this.userDetails.brandId
    //   ) {
    //     console.log("fffffffffffff", this.userDetails);

    //     //This else if block will execute for once Franchise Logged in, then page reload or on click of Dashboard module will call.
    //     this.seasonId = this.userDetails.seasonId;
    //     this.orderWindowId = this.userDetails.orderWindowId;
    //     this.brandId = this.userDetails.brandId;
    //     this.franchiseId = this.userDetails.franchiseId;
    //     this.seasonName = this.userDetails.seasonName;
    //     this.roleId = 0;
    //     this.userId = 0;
    //     this.logUser = 2;
    //     this.activitySeason = this.userDetails.seasonId;
    //     this.orderSumarrySeason = this.userDetails.seasonId;
    //     this.curseasonNewId = this.userDetails.seasonId;
    //     this.getTotalOrderAmount();
    //     this.getCategory1WiseTotalOrder();
    //     this.getOrdersbyFranchiseeType();
    //     this.getOrdersbyGender();
    //     this.getOrdersbyCountry();
    //     this.getOrdersbyTop5MoqArticle();
    //     this.getOrdersbyTop5Gender();
    //     this.getActivityReport();
    //     this.seasonalOrders();
    //     this.currentSeasonalOrders();
    //     this.divisionWiseGenderOrder();
    //     this.getMonthlyWiseReport();
    //     this.getStoreList();
    //     this.getChannelList();
    //   } else {
    //     this.seasonId = this.userDetails.activeSeason;
    //     this.orderWindowId = 0;
    //     this.brandId = 0;
    //     this.franchiseId = 0;
    //     this.roleId =
    //       this.userDetails &&
    //       this.userDetails.roleName &&
    //       this.userDetails.roleName[0].name.includes("Sales")
    //         ? this.userDetails.sales_person_id
    //         : 0;
    //     this.userId = this.userDetails.user_id;
    //     this.logUser = 1;
    //     this.activitySeason = this.userDetails.activeSeason;
    //     this.orderSumarrySeason = this.userDetails.activeSeason;
    //     //console.log('seasonId',this.seasonId);

    //     if (this.seasonId) {
    //       this.getTotalOrderAmount();
    //       this.getCategory1WiseTotalOrder();
    //       this.getOrdersbyFranchiseeType();
    //       this.getOrdersbyGender();
    //       this.getOrdersbyCountry();
    //       this.getOrdersbyTop5MoqArticle();
    //       this.getOrdersbyTop5Gender();
    //       this.getActivityReport();
    //       //current admin dashboard
    //       this.getseasonOrdersbyCountry();
    //       this.getStoreList();
    //       this.getChannelList();
    //     }
    //   }
    // });

    // this.seasonCustomerForm = this.formBuilder.group({
    //   // franchiseName: ['', Validators.required],
    //   prevseasonNewId: [""],
    //   curseasonNewId: [""],
    // });
  }

  get get() {
    return this.seasonForm.controls;
  }

  get getSeasonCustomerFormControls() {
    return this.seasonCustomerForm.controls;
  }

  // public getBrandList(franchiseId) {
  //   this.mastersService.getBrandListByFranchiseId(franchiseId, 1).subscribe(
  //     sResponseModel => {
  //       if (sResponseModel.status) {
  //         this.brandList = sResponseModel.data;
  //         // console.log('getBrandListByFranchiseId', sResponseModel.data);
  //       }
  //       else{
  //         this.common.openSnackBar('No Brand Found For Logged In Customer','', 'danger-snackbar');
  //       }
  //     }, sError => {
  //       // // console.log('Dashboard Total Order Amount Error', sError);
  //       this.common.apiError(sError);
  //     }
  //   );
  // }
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    barThickness: 10,
  };

  public barChartColors: Array<any> = [
    { backgroundColor: "#008ffb" },
    { backgroundColor: "#00e396" },
    { backgroundColor: "#feb019" },
  ];

  public horizontalBarChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    barThickness: 10,
  };

  public horizontalBarChartColors: Array<any> = [
    { backgroundColor: "#0D98FF" },
    { backgroundColor: "#63d102" },
    { backgroundColor: "#2596be" },
  ];

  // events
  public chartClicked(e: any): void {
    // // console.log(e);
  }

  public chartHovered(e: any): void {
    // // console.log(e);
  }

  ngOnInit() {}

  getActivityReport(): void {
    const userDetails = this.common.getUserDetails();
    this.reportSrv
      .getActivityReport(
        this.activitySeason,
        this.orderWindowId,
        this.franchiseId,
        this.brandId,
        this.roleId,
        this.userId,
        userDetails.subsidiary_id,
        this.activityCountry,
        this.selectedStoreType1,
        this.selectedChannel1
      )
      .subscribe(
        (sResponseModel) => {
          //console.log('Reports',sResponseModel.data);

          if (sResponseModel.data) {
            this.activityreports = _.groupBy(
              sResponseModel.data,
              (o) => o.div_name
            );
            //console.log('activityreports',this.activityreports);
            this.activityReportsKeys = Object.keys(this.activityreports);
            //console.log('activityReportsKeys',this.activityReportsKeys);
          } else {
            this.activityReportsKeys = [];
          }
        },
        (sError) => {
          this.common.apiError(sError);
        }
      );
  }

  getActivityExcelReport(): void {
    const fileType = "activityreport";
    const date = this.datePipe.transform(new Date(), "dd-MMM-yyyy");
    this.reportSrv
      .getActivityExcelReport(
        this.seasonId,
        this.orderWindowId,
        this.franchiseId,
        this.brandId
      )
      .subscribe(
        (sResponse) => {
          if (sResponse) {
            saveAs(sResponse, fileType.toUpperCase() + "-" + date + ".xlsx");
          }
        },
        (sError) => {
          this.common.apiError(sError);
        }
      );
  }

  public onTabChanged(event: MatTabChangeEvent): void {
    switch (event.index) {
      case 0: {
        // Activity Report
        //   this.getActivityReport();
        this.getActivityReport();
        break;
      }

      case 1: {
        // Order Summary

        this.getOrderSummary();
        this.getCountryList();
        break;
      }

      case 2: {
        // Monthly wise report
        //  this.getMonthlyWiseReport();
        this.getOrderAnalysis();
        break;
      }

      case 3: {
        // Order Analysis

        break;
      }

      default: {
        // Activity Report
        this.getActivityReport();
        break;
      }
    }
  }

  private getMonthlyWiseReport(): void {
    this.reportSrv
      .getMonthlyWiseReport(
        this.seasonId,
        this.franchiseId,
        this.brandId,
        this.get.selectedStoreType.value != undefined
          ? this.get.selectedStoreType.value
          : 0
      )
      .subscribe(
        (sResponseModel) => {
          if (sResponseModel.data) {
            this.monthlyReports = this.sortByMonth(sResponseModel.data);
            //console.log('Monthlyyy',this.monthlyReports);
          } else {
            this.monthlyReports = [];
          }
        },
        (sError) => {
          this.common.apiError(sError);
        }
      );
  }

  private sortByMonth(monthReports): any[] {
    // var months = ["january", "february", "march", "april", "may", "june",
    //   "july", "august", "september", "october", "november", "december"];
    var months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    monthReports.sort((a, b) => {
      if (a.ord_launch_mon) {
        return (
          months.indexOf(a.ord_launch_mon.toLowerCase()) -
          months.indexOf(b.ord_launch_mon.toLowerCase())
        );
      }
    });
    return monthReports;
  }

  public getOrderSummary(): void {
    const userDetails = this.common.getUserDetails();
    this.reportSrv
      .getOrderSummary(
        this.orderSumarrySeason,
        this.orderWindowId,
        this.franchiseId,
        this.brandId,
        this.roleId,
        this.userId,
        userDetails.subsidiary_id,
        this.selectedCountry,
        this.selectedStoreType1,
        this.selectedChannel1
      )
      .subscribe(
        (sResponseModel) => {
          // console.log('ordersummery',sResponseModel.data);

          if (sResponseModel.data) {
            this.orderSummary = sResponseModel.data;
            this.cloneOrderSummary = _.cloneDeep(this.orderSummary);
            //sconsole.log('clone',this.cloneOrderSummary);
          } else {
            this.orderSummary = [];
          }
        },
        (sError) => {
          this.common.apiError(sError);
        }
      );
  }

  private getOrderAnalysis(): void {
    this.reportSrv
      .getOrderAnalysis(
        this.seasonId,
        this.orderWindowId,
        this.franchiseId,
        this.brandId,
        this.roleId,
        this.userId
      )
      .subscribe(
        (sResponseModel) => {
          //console.log('orderAnalysis',sResponseModel.data);

          if (sResponseModel.data) {
            this.orderAnalysis = sResponseModel.data;
          }
        },
        (sError) => {
          this.common.apiError(sError);
        }
      );
  }

  public getCountryList(): void {
    const userDetails = this.common.getUserDetails();
    this.mastersService.getCountry().subscribe(
      (sResponseModel) => {
        this.countries = sResponseModel.data;
        // console.log(this.countries);

        if (userDetails.franchiseId > 0 && userDetails.countryId) {
          // this.countries = _.filter(
          //   this.countries,
          //   (o) => o.id == userDetails.countryId
          // );
          this.selectedCountry = userDetails.countryId;
        }
      },
      (sError) => {
        this.common.apiError(sError);
      }
    );
  }

  public getTotalOrderAmount() {
    this.dashboardService
      .getTotalOrderAmount(
        this.seasonId,
        this.orderWindowId,
        this.brandId,
        this.franchiseId,
        this.roleId,
        this.userId,
        this.userDetails.subsidiary_id,
        this.get.selectedChannel.value != undefined
          ? this.get.selectedChannel.value
          : 0
      )
      .subscribe(
        (sResponseModel) => {
          //console.log('Dashboard Total Order Data:', sResponseModel);
          if (sResponseModel.data.length > 0) {
            if (this.userDetails.franchiseId > 0) {
              this.totalOrderAmount =
                sResponseModel.data[0][0].totalorderamount === ""
                  ? 0
                  : sResponseModel.data[0][0].totalorderamount;
              this.totalNoOfFranchisee =
                sResponseModel.data[1][0].totalfranchisee;
              this.labelCustomerStore = "Store";
            } else {
              this.totalOrderAmount =
                sResponseModel.data[0][0].totalsgdvalue === ""
                  ? 0
                  : sResponseModel.data[0][0].totalsgdvalue;
              this.totalNoOfFranchisee =
                sResponseModel.data[1][0].totalfranchisee;
              this.labelCustomerStore = "Customer";
            }
            this.totalArticles = sResponseModel.data[2][0].totalarticles;
            this.totalOrderQty =
              sResponseModel.data[3][0].totalorderqty === ""
                ? 0
                : sResponseModel.data[3][0].totalorderqty;
          }
        },
        (sError) => {
          // // console.log('Dashboard Total Order Amount Error', sError);
          this.common.apiError(sError);
        }
      );
  }

  /**getCategory1WiseTotalOrder or (getProductTypeWiseTotalOrder)
   * Dashboard Total Order Vertical Bar Chart
   */
  public getCategory1WiseTotalOrder() {
    this.dashboardService
      .getCategory1WiseTotalOrder(
        this.seasonId,
        this.orderWindowId,
        this.brandId,
        this.franchiseId,
        this.roleId,
        this.userId,
        this.get.selectedStoreType.value != undefined
          ? this.get.selectedStoreType.value
          : 0
      )
      .subscribe(
        (sResponseModel) => {
          // console.log('Dashboard Category_1 wise Total Order Data:', sResponseModel.data);
          if (sResponseModel.data.length > 0) {
            let tempBarData = [];
            let tempBarQtyData = [];
            let tempBarSkuData = [];
            this.category1WiseTotalOrderData = sResponseModel.data;
            this.category1WiseTotalOrderData.forEach((key) => {
              this.barChartLabels.push(key.category_1);
              tempBarQtyData.push(key.total_qty);
              tempBarData.push(
                this.userDetails.franchiseId > 0
                  ? key.total_amount
                  : key.totalsgdvalue
              );
              tempBarSkuData.push(key.sku);
            });
            this.barChartData = [
              { data: tempBarQtyData, label: "Total Qty" },
              { data: tempBarData, label: "Total Amount" },
              { data: tempBarSkuData, label: "Total SKU" },
            ];
            this.boolBarChartData = true;
          }
        },
        (sError) => {
          // // console.log('Dashboard Category_1 wise Total Order Error', sError);
          this.common.apiError(sError);
        }
      );
  }

  /** getOrdersbyFranchiseeType
   * Dashboard Franchisee Type Total Order PIE Chart
   */
  public getOrdersbyFranchiseeType() {
    this.dashboardService
      .getOrdersbyFranchiseeType(
        this.seasonId,
        this.orderWindowId,
        this.brandId,
        this.franchiseId,
        this.roleId,
        this.userId,
        this.get.selectedStoreType.value != undefined
          ? this.get.selectedStoreType.value
          : 0
      )
      .subscribe(
        (sResponseModel) => {
          // console.log('Dashboard Franchisee Type Total Order Data:', sResponseModel.data);
          if (sResponseModel.data.length > 0) {
            this.orderByFranchiseeTypeData = sResponseModel.data;
            this.orderByFranchiseeTypeData.forEach((key) => {
              this.pieChartLabels.push(key.franchisee_type);
              this.pieChartData.push(
                this.userDetails.franchiseId > 0
                  ? key.total_amount
                  : key.totalsgdvalue
              );
              this.boolPieChartData = true;
            });
          }
        },
        (sError) => {
          // // console.log('Dashboard Franchisee Type Total Order Error', sError);
          this.common.apiError(sError);
        }
      );
  }

  /**
   * getOrdersByGender
   */
  public getOrdersbyGender() {
    this.dashboardService
      .getOrdersbyGender(
        this.seasonId,
        this.orderWindowId,
        this.brandId,
        this.franchiseId,
        this.roleId,
        this.userId,
        this.get.selectedStoreType.value != undefined
          ? this.get.selectedStoreType.value
          : 0
      )
      .subscribe(
        (sResponseModel) => {
          // console.log('Dashboard Order by Gender Data:', sResponseModel.data);
          if (sResponseModel.data.length > 0) {
            this.orderByGenderData = sResponseModel.data;
            //console.log(this.orderByGenderData)
            this.orderByGenderData.forEach((key) => {
              if (key.gender === "MEN")
                this.totalOrderbyMen =
                  this.userDetails.franchiseId > 0
                    ? key.total_amount
                    : key.totalsgdvalue;
              if (key.gender === "WOMEN")
                this.totalOrderbyWomen =
                  this.userDetails.franchiseId > 0
                    ? key.total_amount
                    : key.totalsgdvalue;
              if (key.gender === "UNISEX")
                this.totalOrderbyUnisex =
                  this.userDetails.franchiseId > 0
                    ? key.total_amount
                    : key.totalsgdvalue;
              if (key.gender === "KIDS")
                this.totalOrderbyKids =
                  this.userDetails.franchiseId > 0
                    ? key.total_amount
                    : key.totalsgdvalue;
            });
            this.boolPieChartOrderbyGender = true;
            this.pieChartOrderbyGenderLabels = [
              "MEN",
              "WOMEN",
              "KIDS",
              "UNISEX",
            ];
            this.pieChartOrderbyGenderData = [
              this.totalOrderbyMen,
              this.totalOrderbyWomen,
              this.totalOrderbyKids,
              this.totalOrderbyUnisex,
            ];
          }
        },
        (sError) => {
          // // console.log('Dashboard Order by Gender Error', sError);
          this.common.apiError(sError);
        }
      );
  }

  /**
   * getOrdersbyCountry
   */
  public getOrdersbyCountry() {
    this.dashboardService
      .getOrdersbyCountry(
        this.seasonId,
        this.orderWindowId,
        this.brandId,
        this.franchiseId,
        this.roleId,
        this.userId,
        this.get.selectedChannel.value != undefined
          ? this.get.selectedChannel.value
          : 0
      )
      .subscribe(
        // this.dashboardService.getOrdersbyCountry(this.seasonId, this.orderWindowId, this.brandId, this.franchiseId,this.roleId,this.userId).subscribe(
        (sResponseModel) => {
          // console.log('Dashboard Order by Country Data:', sResponseModel.data);
          if (sResponseModel.data.length > 0) {
            this.orderByCountryData = sResponseModel.data;
            const reducer = (accumulator, currentValue) =>
              accumulator + currentValue;
            let total_sum =
              this.orderByCountryData && this.orderByCountryData.length > 0
                ? this.orderByCountryData
                    .map((amt) => Number(amt.total_amount))
                    .reduce(reducer)
                : 0;
            this.orderByCountryData.forEach((key) => {
              this.pieChartOrderbyCountryLabels.push(key.country);
              // let percentVal = Math.round((key.total_amount / total_sum) * 100) + '%';
              // this.pieChartOrderbyCountryData.push(percentVal);
              this.pieChartOrderbyCountryData.push(
                Math.round((key.total_amount / total_sum) * 100)
              );
              this.boolPieChartOrderbyCountryData = true;
            });
          }
        },
        (sError) => {
          // // console.log('Dashboard Order by Country Error', sError);
          this.common.apiError(sError);
        }
      );
  }

  /**
   * getOrdersbyTop5MoqArticle
   */
  public getOrdersbyTop5MoqArticle() {
    this.dashboardService
      .getOrdersByTop5MoqArticle(
        this.seasonId,
        this.orderWindowId,
        this.brandId,
        this.franchiseId,
        this.roleId,
        this.userId
      )
      .subscribe(
        (sResponseModel) => {
          // console.log('Dashboard Order by Top5 Moq Article Data:', sResponseModel.data);
          if (sResponseModel.data.length > 0) {
            let tempHorizontalBarQtyData = [];
            let tempHorizontalBarMoqData = [];
            this.orderByTop5MoqArticleData = sResponseModel.data;
            this.orderByTop5MoqArticleData.forEach((key) => {
              this.hBarTop5MoqArticleChartLabels.push(key.article_description);
              tempHorizontalBarMoqData.push(key.moq);
              tempHorizontalBarQtyData.push(key.qty);
            });
            this.hBarTop5MoqArticleChartData = [
              { data: tempHorizontalBarMoqData, label: "MOQ" },
              { data: tempHorizontalBarQtyData, label: "Total Qty" },
            ];
            this.hBarboolTop5MoqArticleChartData = true;
          }
        },
        (sError) => {
          // // console.log('Dashboard Order by Top5 Moq Article Error', sError);
          this.common.apiError(sError);
        }
      );
  }

  /**
   * getOrdersbyTop5Gender
   */
  public getOrdersbyTop5Gender() {
    this.dashboardService
      .getOrdersbyTop5Gender(
        this.curseasonNewId,
        this.orderWindowId,
        this.brandId,
        this.franchiseId,
        this.roleId,
        this.userId,
        this.userDetails.subsidiary_id,
        this.selectedCountryList,
        this.get.selectedChannel.value != undefined
          ? this.get.selectedChannel.value
          : 0,
        this.get.selectedStoreType.value != undefined
          ? this.get.selectedStoreType.value
          : 0
      )
      .subscribe(
        (sResponseModel) => {
          // console.log('Dashboard Order by Top5 Genderwise Data:', sResponseModel.data);
          if (sResponseModel.data.length > 0) {
            this.orderByTop5GenderwiseData = sResponseModel.data;

            if (this.orderByTop5GenderwiseData[0] != false) {
              const tempHorizontalBarAmtData = [];
              const tempHorizontalBarQtyData = [];
              this.hBarTop5MenChartLabels = [];
              this.orderByTop5GenderwiseData[0].forEach((key) => {
                this.hBarTop5MenChartLabels.push(key.article_description);
                tempHorizontalBarQtyData.push(key.total_qty);
                tempHorizontalBarAmtData.push(
                  this.userDetails.franchiseId > 0
                    ? key.total_price
                    : key.totalsgdvalue
                );
              });
              this.hBarTop5MenChartData = [
                { data: tempHorizontalBarQtyData, label: "Total Qty" },
                { data: tempHorizontalBarAmtData, label: "Total Amount" },
              ];
              //console.log(this.hBarTop5MenChartData);

              this.hBarboolTop5MenChartData = true;
            } else {
              this.hBarboolTop5MenChartData = false;
            }

            if (this.orderByTop5GenderwiseData[4] != false) {
              const tempHorizontalBarAmtData = [];
              const tempHorizontalBarQtyData = [];
              this.hBarTop5MenChartLabelsApeq = [];
              this.orderByTop5GenderwiseData[4].forEach((key) => {
                this.hBarTop5MenChartLabelsApeq.push(key.article_description);
                tempHorizontalBarQtyData.push(key.total_qty);
                tempHorizontalBarAmtData.push(
                  this.userDetails.franchiseId > 0
                    ? key.total_price
                    : key.totalsgdvalue
                );
              });
              this.hBarTop5MenChartDataApeq = [
                { data: tempHorizontalBarQtyData, label: "Total Qty" },
                { data: tempHorizontalBarAmtData, label: "Total Amount" },
              ];
              //console.log(this.hBarTop5MenChartData);

              this.hBarboolTop5MenChartDataApeq = true;
            } else {
              this.hBarboolTop5MenChartDataApeq = false;
            }

            if (this.orderByTop5GenderwiseData[1] != false) {
              const tempHorizontalBarAmtData = [];
              const tempHorizontalBarQtyData = [];
              this.hBarTop5WomenChartLabels = [];
              this.orderByTop5GenderwiseData[1].forEach((key) => {
                this.hBarTop5WomenChartLabels.push(key.article_description);
                tempHorizontalBarQtyData.push(key.total_qty);
                tempHorizontalBarAmtData.push(
                  this.userDetails.franchiseId > 0
                    ? key.total_price
                    : key.totalsgdvalue
                );
              });
              this.hBarTop5WomenChartData = [
                { data: tempHorizontalBarQtyData, label: "Total Qty" },
                { data: tempHorizontalBarAmtData, label: "Total Amount" },
              ];
              this.hBarboolTop5WomenChartData = true;
            } else {
              this.hBarboolTop5WomenChartData = false;
            }

            if (this.orderByTop5GenderwiseData[5] != false) {
              const tempHorizontalBarAmtData = [];
              const tempHorizontalBarQtyData = [];
              this.hBarTop5WomenChartLabelsApeq = [];
              this.orderByTop5GenderwiseData[5].forEach((key) => {
                this.hBarTop5WomenChartLabelsApeq.push(key.article_description);
                tempHorizontalBarQtyData.push(key.total_qty);
                tempHorizontalBarAmtData.push(
                  this.userDetails.franchiseId > 0
                    ? key.total_price
                    : key.totalsgdvalue
                );
              });
              this.hBarTop5WomenChartDataApeq = [
                { data: tempHorizontalBarQtyData, label: "Total Qty" },
                { data: tempHorizontalBarAmtData, label: "Total Amount" },
              ];
              this.hBarboolTop5WomenChartDataApeq = true;
            } else {
              this.hBarboolTop5WomenChartDataApeq = false;
            }

            if (this.orderByTop5GenderwiseData[2] != false) {
              const tempHorizontalBarAmtData = [];
              const tempHorizontalBarQtyData = [];
              this.hBarTop5UnisexChartLabels = [];
              this.orderByTop5GenderwiseData[2].forEach((key) => {
                this.hBarTop5UnisexChartLabels.push(key.article_description);
                tempHorizontalBarQtyData.push(key.total_qty);
                tempHorizontalBarAmtData.push(
                  this.userDetails.franchiseId > 0
                    ? key.total_price
                    : key.totalsgdvalue
                );
              });
              this.hBarTop5UnisexChartData = [
                { data: tempHorizontalBarQtyData, label: "Total Qty" },
                { data: tempHorizontalBarAmtData, label: "Total Amount" },
              ];
              this.hBarboolTop5UnisexChartData = true;
            } else {
              this.hBarboolTop5UnisexChartData = false;
            }

            if (this.orderByTop5GenderwiseData[6] != false) {
              const tempHorizontalBarAmtData = [];
              const tempHorizontalBarQtyData = [];
              this.hBarTop5UnisexChartLabelsApeq = [];
              this.orderByTop5GenderwiseData[6].forEach((key) => {
                this.hBarTop5UnisexChartLabelsApeq.push(
                  key.article_description
                );
                tempHorizontalBarQtyData.push(key.total_qty);
                tempHorizontalBarAmtData.push(
                  this.userDetails.franchiseId > 0
                    ? key.total_price
                    : key.totalsgdvalue
                );
              });
              this.hBarTop5UnisexChartDataApeq = [
                { data: tempHorizontalBarQtyData, label: "Total Qty" },
                { data: tempHorizontalBarAmtData, label: "Total Amount" },
              ];
              this.hBarboolTop5UnisexChartDataApeq = true;
            } else {
              this.hBarboolTop5UnisexChartDataApeq = false;
            }

            if (this.orderByTop5GenderwiseData[3] != false) {
              const tempHorizontalBarAmtData = [];
              const tempHorizontalBarQtyData = [];
              this.hBarTop5KidsChartLabels = [];
              this.orderByTop5GenderwiseData[3].forEach((key) => {
                this.hBarTop5KidsChartLabels.push(key.article_description);
                tempHorizontalBarQtyData.push(key.total_qty);
                tempHorizontalBarAmtData.push(
                  this.userDetails.franchiseId > 0
                    ? key.total_price
                    : key.totalsgdvalue
                );
              });
              this.hBarTop5KidsChartData = [
                { data: tempHorizontalBarQtyData, label: "Total Qty" },
                { data: tempHorizontalBarAmtData, label: "Total Amount" },
              ];
              this.hBarboolTop5KidsChartData = true;
            } else {
              this.hBarboolTop5KidsChartData = false;
            }
          }
        },
        (sError) => {
          // // console.log('Dashboard Order by Top5 Genderwise Error', sError);
          this.common.apiError(sError);
        }
      );
  }

  public resetCharts() {
    this.barChartLabels = [];
    this.barChartData = [];
  }

  public generatePopUp() {
    console.log("this.userDetails", this.userDetails.franchiseId);
    const onlyActive = 1;
    this.mastersService
      .getOrderWindowSeasonList2(onlyActive, this.userDetails.franchiseId)
      .subscribe(
        (data) => {
          console.log("generatePopUp", data);
          if (data.status) {
            this.mastersService
              .getBrandListByFranchiseId(this.userDetails.franchiseId, 1)
              .subscribe(
                (sResponseModel2) => {
                  if (sResponseModel2.status) {
                    this.brandList = sResponseModel2.data;

                    //console.log('getBrandListByFranchiseId', data.data);
                    // if (this.userDetails && this.userDetails.roleName[0] && this.userDetails.roleName[0].name.includes('sub')) {

                    this.orderWindowSeasonList =
                      data.data.length > 0
                        ? data.data.filter(
                            (o) =>
                              o.subsidiary_id == this.userDetails.subsidiary_id
                          )
                        : [];
                    //  }
                    this.openDialog();
                  } else {
                    this.common.openSnackBar(
                      "No Brand Found For Logged In Customer",
                      "",
                      "danger-snackbar"
                    );
                    window.localStorage.removeItem("mean-token");
                    this.router.navigate(["login"]);
                  }
                },
                (sError) => {
                  // // console.log('Dashboard Total Order Amount Error', sError);
                  this.common.apiError(sError);
                }
              );
          } else {
            this.common.openSnackBar(
              "No Order Window Found For Logged In Customer",
              "",
              "danger-snackbar"
            );
            window.localStorage.removeItem("mean-token");
            this.router.navigate(["login"]);
          }
        },
        (sError) => {
          this.common.apiError(sError);
        }
      );
  }

  openDialog(): void {
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
        isInit: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed', result);
      let filterSelectedData = this.orderWindowSeasonList.filter(
        (item) => item.id == result.orderWindowIdSelected
      );
      console.log("filterSelectedData", filterSelectedData);
      // localStorage.setItem("order-window-id", filterSelectedData[0].id);
      // localStorage.setItem("season-id", filterSelectedData[0].season_id);
      let userDetails = this.common.getUserDetails();
      userDetails.orderWindowId = filterSelectedData[0].id;
      userDetails.seasonId = filterSelectedData[0].season_id;
      userDetails.brandId = parseInt(result.brandId);
      userDetails.seasonName = filterSelectedData[0].season_name;
      userDetails.orderWindowName = filterSelectedData[0].name;
      userDetails.orderWindowType = filterSelectedData[0].ow_type;
      //Object.assign(userDetails,{orderWindowType:filterSelectedData[0].ow_type});
      //console.log('userDetailsggggggg',userDetails);
      userDetails.active_or_not = filterSelectedData[0].active_or_not;
      this.seasonId = filterSelectedData[0].season_id;
      this.orderStatus = 4;
      this.orderWindowId = filterSelectedData[0].id;
      this.orderWindowType = filterSelectedData[0].ow_type;
      this.common.setUserDetails(userDetails);
      this.common.openSnackBar(
        "Welcome to ASICS Order Management System",
        "",
        "success-snackbar"
      );

      this.seasonId = userDetails.seasonId;
      this.orderWindowId = userDetails.orderWindowId;
      this.brandId = userDetails.brandId;
      this.franchiseId = userDetails.franchiseId;

      this.router.navigateByUrl("/dashboard");
      window.location.reload();

      // this.getTotalOrderAmount();
      // this.getCategory1WiseTotalOrder();
      // this.getOrdersbyFranchiseeType();
      // this.getOrdersbyGender();
      // this.getOrdersbyCountry();
      // this.getOrdersbyTop5MoqArticle();
      // this.getOrdersbyTop5Gender();
      // this.getActivityReport();
      // // console.log('userDetails', userDetails);
      // this.router.navigateByUrl("/orders/store-sales-analysis");
    });
  }

  public onCountryChanged(value) {
    if (value) {
      this.orderSummary = this.cloneOrderSummary.filter((order) => {
        return order.country_name == value;
      });
    }
  }

  onExportClicked(fileType?: any, filterKey?: any, filterValue?: any) {
    this.common.exportAsExcelFileParams(
      this.seasonId,
      this.orderWindowId,
      this.brandId,
      this.franchiseId,
      fileType,
      filterKey,
      filterValue
    );
  }

  getStatus(statusCode): string {
    switch (statusCode) {
      case 1: {
        return "Draft";
      }
      case 2: {
        return "Cancelled";
      }
      case 3: {
        return "Pending for review";
      }
      case 4: {
        return "Approved";
      }
      case 5: {
        return "Rejected";
      }
    }
  }

  getObject(data, keys) {
    const result = [];
    data.forEach((o) => {
      keys.forEach((key) => {
        if (!o.key) {
          //  o.key =type o.type o.default
        }
      });
    });
  }

  //New dashboard work started from here

  currentSeasonalOrders() {
    this.common.showSpinner();
    this.dashboardService
      .getSeasonalOrdersCurrentSeason(
        this.seasonId,
        this.orderWindowId,
        this.brandId,
        this.franchiseId,
        this.roleId,
        this.userId,
        this.get.selectedStoreType.value != undefined
          ? this.get.selectedStoreType.value
          : 0
      )
      .subscribe(
        (sResponse: any) => {
          //console.log('seasonal order',sResponse.data);
          if (sResponse.data.length > 0) {
            this.seasonalOrderData = sResponse.data[0];
            //  this.categoryOrderdata = sResponse.data[1]?sResponse.data[1].item:[];
            this.catgoryCurSeasondata = sResponse.data[1]
              ? sResponse.data[1].item
              : [];
            // this.catgoryPrevSeasondata = this.categoryOrderdata[sResponse.data[1].prevSeasonId];
            //console.log('Main',sResponse.data[1]);

            //console.log('this.categoryOrderdata',  this.categoryOrderdata);
            //console.log('this.catgoryCurSeasondata',  this.catgoryCurSeasondata);
            //console.log('this.catgoryPrevSeasondata',  this.catgoryPrevSeasondata);
            // console.log('this.seasonalOrderData',  this.seasonalOrderData.cur_seasondata);
            // this.categoryAnalise(3,'amt',1);
            this.common.hideSpinner();
          } else {
            this.seasonalOrderData = [];
            this.catgoryCurSeasondata = [];
          }
        },
        (sError) => {
          this.common.apiError(sError);
        }
      );
  }

  seasonalOrders() {
    this.common.showSpinner();
    this.dashboardService
      .getSeasonalOrders(
        this.curseasonNewId,
        this.orderWindowId,
        this.brandId,
        this.franchiseId,
        this.roleId,
        this.userId,
        this.prevseasonNewId
      )
      .subscribe(
        (sResponse: any) => {
          console.log("seasonal order", sResponse.data);
          if (sResponse.data.length > 0) {
            // this.quantityvarince=sResponse.data
            this.seasonalOrderComparision = sResponse.data[0];
            this.categoryOrderdata = _.groupBy(
              sResponse.data[1].item,
              (o) => o.season_id
            );
            this.categoryOrderdataComparision =
              this.categoryOrderdata[sResponse.data[1].curSeasonId];
            this.catgoryPrevSeasondata =
              this.categoryOrderdata[sResponse.data[1].prevSeasonId];
            this.common.hideSpinner();
          } else {
            this.seasonalOrderComparision = [];
            this.categoryOrderdataComparision = [];
            this.catgoryPrevSeasondata = [];
          }
        },
        (sError) => {
          this.common.apiError(sError);
        }
      );
  }

  public getDivisionList() {
    this.common.showSpinner();
    this.masterService.getListDivision().subscribe(
      (sResponseModel) => {
        if (sResponseModel.data) {
          this.divisionList = sResponseModel.data;
          //console.log('divisions',this.divisionList);
          this.common.hideSpinner();
        }
      },
      (sError) => {
        this.common.apiError(sError);
      }
    );
  }

  public getGenderList() {
    this.common.showSpinner();
    this.masterService.getListGender().subscribe(
      (sResponseModel) => {
        this.common.hideSpinner();
        if (sResponseModel.data) {
          this.genderList = sResponseModel.data;
          //console.log('genderList',this.genderList);
        }
      },
      (sError) => {
        this.common.apiError(sError);
      }
    );
  }

  public getCategoryList() {
    this.common.showSpinner();
    this.masterService.getListProductType().subscribe(
      (sResponseModel) => {
        this.common.hideSpinner();
        if (sResponseModel.data && sResponseModel.data.length > 0) {
          this.cateogoryList = sResponseModel.data;
          //console.log('cateogoryList',this.cateogoryList);
        } else {
          this.cateogoryList = [];
        }
      },
      (sError) => {
        this.common.apiError(sError);
      }
    );
  }

  public getSeasonList() {
    // console.log("reached");
    this.mastersService.getlistSeason().subscribe(
      (sResponseModel) => {
        //  console.log("sResponseModel.data",sResponseModel);
        if (sResponseModel.status) {
          this.seasonList = sResponseModel.data;
          //console.log('seasonList',this.seasonList);
        } else {
          this.common.openSnackBar("No record found", "", "danger-snackbar");
        }
      },
      (sError) => {
        this.common.apiError(sError);
      }
    );
  }

  getSeasonName(s_id) {
    let sdata = _.find(this.seasonList, { id: s_id });
    //console.log('sdata',sdata);
    if (sdata) {
      return sdata.name;
    }
  }

  divisionWiseGenderOrder() {
    this.dashboardService
      .getGenderDivisionwiseOrder(
        this.curseasonNewId,
        this.orderWindowId,
        this.brandId,
        this.franchiseId,
        this.roleId,
        this.userId,
        this.prevseasonNewId,
        this.get.selectedStoreType.value != undefined
          ? this.get.selectedStoreType.value
          : 0
      )
      .subscribe(
        (sResponse: any) => {
          //console.log('Divisionwisegender',sResponse.data);
          // this.divisionGenderData=this.nestedGroup(sResponse.data[0],['division_id','gender_id']);
          if (sResponse.data && sResponse.data.length > 0) {
            let temp = _.groupBy(sResponse.data[0].item, (o) => o.season_id);
            this.genderCurSeasondata = temp[sResponse.data[0].curSeasonId];
            this.genderPrevSeasondata = temp[sResponse.data[0].prevSeasonId];
            this.curseasonId = sResponse.data[0].curSeasonId;
            this.prevseasonId = sResponse.data[0].prevSeasonId;
            this.gropupBYgenderCur = _.groupBy(
              this.genderCurSeasondata,
              (o) => o.division_id
            );
            this.gropupBYgenderPrev = _.groupBy(
              this.genderPrevSeasondata,
              (o) => o.division_id
            );

            //console.log('genderCurSeasondata',this.genderCurSeasondata);
            let curdata = _.filter(this.genderCurSeasondata, {
              division_id: 2,
              gender_id: 3,
            });
          } else {
            this.genderCurSeasondata = [];
            this.genderPrevSeasondata = [];
            this.gropupBYgenderCur = [];
            this.gropupBYgenderPrev = [];
          }
          //console.log('curdata',curdata);
        },
        (sError) => {
          this.common.apiError(sError);
        }
      );
  }

  getSum(data, key) {
    let sum = _.sumBy(data, (item: any) => Number(item[key])) || 0;
    return sum;
  }

  nestedGroup(data, groups) {
    let x = data.reduce((r, o) => {
      groups
        .reduce(
          (group, key, i, { length }) =>
            (group[o[key]] = group[o[key]] || (i + 1 === length ? [] : {})),
          r
        )
        .push(o);

      return r;
    }, {});
    return x;
  }

  categoryAnalise(id, disp, type) {
    let curdata = _.find(this.categoryOrderdataComparision, {
      category_id: id,
    });
    let prevdata = _.find(this.catgoryPrevSeasondata, { category_id: id });
    //console.log('curdata',curdata);
    //console.log('prevdata',prevdata);
    if (disp == "amt") {
      if (type == 1 && curdata) {
        return curdata.totalorderamount;
      } else if (type == 2 && prevdata) {
        return prevdata.totalorderamount;
      } else if (type == 3) {
        let per = 0;
        if (curdata && prevdata) {
          per = Math.round(
            ((curdata.totalorderamount - prevdata.totalorderamount) /
              prevdata.totalorderamount) *
              100
          );
        }
        return per;
      }
    } else if (disp == "qty") {
      if (type == 1 && curdata) {
        return curdata.totalquantity;
      } else if (type == 2 && prevdata) {
        return prevdata.totalquantity;
      } else if (type == 3) {
        let per = 0;
        if (curdata && prevdata) {
          per = Math.round(
            ((curdata.totalquantity - prevdata.totalquantity) /
              prevdata.totalquantity) *
              100
          );
        }
        return per;
      }
    }
  }

  genderAnalise(div_id, gen_id, type, seasson_type?) {
    //console.log(div_id+"=>"+gen_id);
    let curdata = _.find(this.genderCurSeasondata, {
      division_id: div_id,
      gender_id: gen_id,
    });
    let prevdata = _.find(this.genderPrevSeasondata, {
      division_id: div_id,
      gender_id: gen_id,
    });

    if (seasson_type == 1) {
      // console.log('curdata',curdata);
      if (curdata) {
        if (type == "amt") {
          return curdata.total_amount;
        } else if (type == "qty") {
          return curdata.total_qty;
        } else if (type == "sku") {
          return curdata.total_sku;
        }
      }
    } else if (seasson_type == 2) {
      if (prevdata) {
        if (type == "amt") {
          return prevdata.total_amount;
        } else if (type == "qty") {
          return prevdata.total_qty;
        } else if (type == "sku") {
          return prevdata.total_sku;
        }
      }
    }

    if (curdata && prevdata) {
      let per = 0;
      if (type == "amt") {
        per = Math.round(
          ((curdata.total_amount - prevdata.total_amount) /
            prevdata.total_amount) *
            100
        );
      } else if (type == "qty") {
        per = Math.round(
          ((curdata.total_qty - prevdata.total_qty) / prevdata.total_qty) * 100
        );
      }
      //return `((${curdata.total_amount }-${prevdata.total_amount})/${prevdata.total_amount})/100)`;
      return per;
    } else {
      return 0;
    }
  }

  //admin Functions

  getseasonOrdersbyCountry() {
    this.common.showSpinner();
    // console.log(this.curseasonNewId)
    const seasonData: any =
      _.find(this.seasonList, { id: this.curseasonNewId }) || 0;
    // console.log(seasonData);
    this.seasonData = seasonData ? seasonData.name.substring(0, 2) : 21;
    this.dashboardService
      .getadminOrdersBycountry(
        this.curseasonNewId,
        this.prevseasonNewId,
        this.roleId,
        this.userId,
        this.userDetails.subsidiary_id,
        this.selectedCountryList,
        this.get.selectedChannel.value != undefined
          ? this.get.selectedChannel.value
          : 0,
        this.get.selectedStoreType.value != undefined
          ? this.get.selectedStoreType.value
          : 0
      )
      .subscribe(
        (sResponse: any) => {
          console.log("countryOrders", sResponse.data);
          if (sResponse.data && sResponse.data.length > 0) {
            this.orderByCountryData = sResponse.data[0];
            this.categoryOrdersBycountry = sResponse.data[1];
            this.adminDivisionwiseGender = sResponse.data[2];
            this.adminmonthlyReports = sResponse.data[3];
            this.monthList = sResponse.data[3].monthList;
            // this.monthList =  Object.keys(sResponse.data[3].monthList);

            this.adminstoreOrders = sResponse.data[4];
            console.log("countryOrders", this.orderByCountryData);
            console.log("adminmonthlyReports", this.adminmonthlyReports);
            this.common.hideSpinner();
          } else {
            this.orderByCountryData = [];
            this.categoryOrdersBycountry = [];
            this.adminDivisionwiseGender = [];
            this.adminmonthlyReports = [];
            this.monthList = [];
          }
        },
        (sError) => {
          this.common.apiError(sError);
        }
      );
  }

  adminOrderAnalysis(cid, type, stype?) {
    let curdata =
      this.orderByCountryData && this.orderByCountryData["activeSeasondata"]
        ? cid
          ? _.find(this.orderByCountryData["activeSeasondata"], {
              country_id: cid,
            })
          : this.orderByCountryData["activeSeasondata"]
        : 0;
    let prevdata =
      this.orderByCountryData &&
      this.orderByCountryData["curyearPrevSeasondata"]
        ? cid
          ? _.find(this.orderByCountryData["curyearPrevSeasondata"], {
              country_id: cid,
            })
          : this.orderByCountryData["curyearPrevSeasondata"]
        : 0;

    if (stype == 1) {
      if (curdata) {
        if (type == "amt") {
          return curdata.totalsgdvalue;
        } else if (type == "qty") {
          return curdata.totalquantity;
        }
      }
    } else if (stype == 2) {
      if (prevdata) {
        if (type == "amt") {
          return prevdata.totalsgdvalue;
        } else if (type == "qty") {
          return prevdata.totalquantity;
        }
      }
    } else if (stype == "tot") {
      if (curdata && prevdata) {
        if (type == "amt") {
          let sum =
            parseFloat(curdata.totalsgdvalue) +
            parseFloat(prevdata.totalsgdvalue);
          return sum;
        } else if (type == "qty") {
          let sum =
            parseFloat(curdata.totalquantity) +
            parseFloat(prevdata.totalquantity);
          return sum;
        }
      }
    }

    if (stype == 3 && prevdata) {
      if (type == "amt") {
        return prevdata && prevdata.length > 0
          ? prevdata
              .map((o) => parseFloat(o["totalsgdvalue"]))
              .reduce((accumulator, currentValue) => accumulator + currentValue)
          : 0;
      } else if (type == "qty") {
        return prevdata && prevdata.length > 0
          ? prevdata
              .map((o) => parseFloat(o["totalquantity"]))
              .reduce((accumulator, currentValue) => accumulator + currentValue)
          : 0;
      }
    }

    if (stype == 4 && curdata) {
      if (type == "amt") {
        return curdata && curdata.length > 0
          ? curdata
              .map((o) => parseFloat(o["totalsgdvalue"]))
              .reduce((accumulator, currentValue) => accumulator + currentValue)
          : 0;
      } else if (type == "qty") {
        return curdata && curdata.length > 0
          ? curdata
              .map((o) => parseFloat(o["totalquantity"]))
              .reduce((accumulator, currentValue) => accumulator + currentValue)
          : 0;
      }
    }
  }

  adminCategoryAnalusis(catid, type, stype, cid?) {
    // console.log(cid)
    let curdata = this.categoryOrdersBycountry["activeSeasondata"]
      ? _.find(this.categoryOrdersBycountry["activeSeasondata"], {
          country_id: cid,
          category_1: catid,
        })
      : 0;
    let prevdata = this.categoryOrdersBycountry["curyearPrevSeasondata"]
      ? _.find(this.categoryOrdersBycountry["curyearPrevSeasondata"], {
          country_id: cid,
          category_1: catid,
        })
      : 0;

    if (stype == 1) {
      if (curdata) {
        if (type == "amt") {
          return curdata.totalsgdvalue;
        }
        if (type == "qty") {
          return curdata.total_qty;
        }
      }
      if (type == "tot_amt") {
        let catwise = this.categoryOrdersBycountry["activeSeasondata"]
          ? _.groupBy(
              this.categoryOrdersBycountry["activeSeasondata"],
              (o) => o.category_1
            )
          : 0;
        // console.log(catwise);
        let sum = this.getSum(catwise[catid], "totalsgdvalue");
        return sum;
      }
      if (type == "tot_amt2") {
        let cntwise = this.categoryOrdersBycountry["activeSeasondata"]
          ? _.groupBy(
              this.categoryOrdersBycountry["activeSeasondata"],
              (o) => o.country_id
            )
          : 0;
        // console.log(cntwise);
        let sum = this.getSum(cntwise[cid], "totalsgdvalue");
        // this.sumCategory += sum;
        return sum;
      }
      if (type == "tot_qty") {
        let catwise = this.categoryOrdersBycountry["activeSeasondata"]
          ? _.groupBy(
              this.categoryOrdersBycountry["activeSeasondata"],
              (o) => o.category_1
            )
          : 0;
        //console.log(catwise);
        let sum = this.getSum(catwise[catid], "total_qty");
        return sum;
      }
      if (type == "tot_qty2") {
        let cntwise = this.categoryOrdersBycountry["activeSeasondata"]
          ? _.groupBy(
              this.categoryOrdersBycountry["activeSeasondata"],
              (o) => o.country_id
            )
          : 0;
        //console.log(catwise);
        let sum = this.getSum(cntwise[cid], "total_qty");
        return sum;
      }
    }
    if (stype == 2) {
      if (prevdata) {
        if (type == "amt") {
          return prevdata.totalsgdvalue;
        }
        if (type == "qty") {
          return prevdata.total_qty;
        }
      }
      if (type == "tot_amt") {
        let catwise = _.groupBy(
          this.categoryOrdersBycountry["curyearPrevSeasondata"],
          (o) => o.category_1
        );
        //console.log(catwise);
        let sum = this.getSum(catwise[catid], "totalsgdvalue");
        return sum;
      }
      if (type == "tot_amt2") {
        let cntwise = _.groupBy(
          this.categoryOrdersBycountry["curyearPrevSeasondata"],
          (o) => o.country_id
        );
        //console.log(catwise);
        let sum = this.getSum(cntwise[cid], "totalsgdvalue");
        // this.sumCategory += sum;
        return sum;
      }
      if (type == "tot_qty") {
        let catwise = _.groupBy(
          this.categoryOrdersBycountry["curyearPrevSeasondata"],
          (o) => o.category_1
        );
        //console.log(catwise);
        let sum = this.getSum(catwise[catid], "total_qty");
        return sum;
      }
      if (type == "tot_qty2") {
        let cntwise = _.groupBy(
          this.categoryOrdersBycountry["curyearPrevSeasondata"],
          (o) => o.country_id
        );
        //console.log(catwise);
        let sum = this.getSum(cntwise[cid], "total_qty");
        return sum;
      }
    }

    if (stype == 3) {
      //  this.sumCategory = this.categoryOrdersBycountry && this.categoryOrdersBycountry['activeSeasondata'] && this.categoryOrdersBycountry['activeSeasondata'].length > 0 ? this.categoryOrdersBycountry['activeSeasondata'].reduce((a, { totalsgdvalue }) => {console.log(a);console.log(totalsgdvalue)}) : 0;
      // this.sumCategory = this.categoryOrdersBycountry && this.categoryOrdersBycountry['curyearPrevSeasondata'] && this.categoryOrdersBycountry['curyearPrevSeasondata'].length > 0 ? this.categoryOrdersBycountry['curyearPrevSeasondata'].reduce((a, { totalsgdvalue }) => a + totalsgdvalue, 0) : 0;
    }
  }

  admingenderAnalise(div_id, gen_id, type, seasson_type?) {
    //console.log(div_id+"=>"+gen_id);
    let curdata = _.find(this.adminDivisionwiseGender["activeSeasondata"], {
      division_id: div_id,
      gender_id: gen_id,
    });
    let prevdata = _.find(
      this.adminDivisionwiseGender["curyearPrevSeasondata"],
      { division_id: div_id, gender_id: gen_id }
    );

    if (seasson_type == 1) {
      // console.log('curdata',curdata);
      if (curdata) {
        if (type == "amt") {
          return curdata.totalsgdvalue;
        } else if (type == "qty") {
          return curdata.total_qty;
        } else if (type == "sku") {
          return curdata.total_sku;
        }
      }
      let divwise = this.adminDivisionwiseGender["activeSeasondata"]
        ? _.groupBy(
            this.adminDivisionwiseGender["activeSeasondata"],
            (o) => o.division_id
          )
        : 0;
      if (type == "tot_amt") {
        let sum = this.getSum(divwise[div_id], "totalsgdvalue");
        return sum;
      }
      if (type == "tot_qty") {
        let sum = this.getSum(divwise[div_id], "total_qty");
        return sum;
      }

      if (type == "tot_sku") {
        let sum = this.getSum(divwise[div_id], "total_sku");
        return sum;
      }
    } else if (seasson_type == 2) {
      // if (prevdata) {
      //   if (type == 'amt') {
      //     return prevdata.total_amount;
      //   } else if (type == 'qty') {
      //     return prevdata.total_qty;
      //   } else if (type == 'sku') {
      //     return prevdata.total_sku;
      //   }
      // }

      if (prevdata) {
        if (type == "amt") {
          return prevdata.totalsgdvalue;
        } else if (type == "qty") {
          return prevdata.total_qty;
        } else if (type == "sku") {
          return prevdata.total_sku;
        }
      }
      let divwise = _.groupBy(
        this.adminDivisionwiseGender["curyearPrevSeasondata"],
        (o) => o.division_id
      );
      if (type == "tot_amt") {
        let sum = this.getSum(divwise[div_id], "totalsgdvalue");
        return sum;
      }
      if (type == "tot_qty") {
        let sum = this.getSum(divwise[div_id], "total_qty");
        return sum;
      }

      if (type == "tot_sku") {
        let sum = this.getSum(divwise[div_id], "total_sku");
        return sum;
      }
    }
  }
  countryMonthWiseAnalise(country_id, country_month, type, flag?: any) {
    let curdata = _.find(this.adminmonthlyReports["countyWiseData"], {
      country_id: country_id,
      launch_month: country_month,
    });
    let prevCurdata = _.find(this.adminmonthlyReports["prevCountryWiseDate"], {
      country_id: country_id,
      launch_month: country_month,
    });
    if (flag == 1) {
      if (curdata) {
        if (type == "amt") {
          return curdata.totalsgdvalue;
        } else if (type == "qty") {
          return curdata.totalquantity;
        }
      }
      let groupwise = _.groupBy(
        this.adminmonthlyReports["countyWiseData"],
        (o) => (country_id ? o.country_id : o.launch_month)
      );
      if (type == "tot_amt") {
        let sum = this.getSum(
          groupwise[country_id ? country_id : country_month],
          "totalsgdvalue"
        );
        return sum;
      }
      if (type == "tot_qty") {
        let sum = this.getSum(
          groupwise[country_id ? country_id : country_month],
          "totalquantity"
        );
        return sum;
      }

      if (type == "total_amt") {
        return this.getSum(
          this.adminmonthlyReports["countyWiseData"],
          "totalsgdvalue"
        );
      }
      if (type == "total_qty") {
        return this.getSum(
          this.adminmonthlyReports["countyWiseData"],
          "totalquantity"
        );
      }
    }

    if (flag == 2) {
      if (prevCurdata) {
        if (type == "amt") {
          return prevCurdata.totalsgdvalue;
        } else if (type == "qty") {
          return prevCurdata.totalquantity;
        }
        // else if(type=='sku'){
        //   return curdata.total_sku;
        // }
      }
      let groupwise = _.groupBy(
        this.adminmonthlyReports["prevCountryWiseDate"],
        (o) => (country_id ? o.country_id : o.launch_month)
      );
      if (type == "tot_amt") {
        let sum = this.getSum(
          groupwise[country_id ? country_id : country_month],
          "totalsgdvalue"
        );
        return sum;
      }
      if (type == "tot_qty") {
        let sum = this.getSum(
          groupwise[country_id ? country_id : country_month],
          "totalquantity"
        );
        return sum;
      }

      if (type == "total_amt") {
        return this.getSum(
          this.adminmonthlyReports["prevCountryWiseDate"],
          "totalsgdvalue"
        );
      }
      if (type == "total_qty") {
        return this.getSum(
          this.adminmonthlyReports["prevCountryWiseDate"],
          "totalquantity"
        );
      }
    }
  }

  countryMonthWiseAnaliseprev(country_id, country_month, type) {
    let curdata = _.find(this.adminmonthlyReports["prevCountryWiseDate"], {
      country_id: country_id,
      launch_month: country_month,
    });
    if (curdata) {
      if (type == "amt") {
        return curdata.totalsgdvalue;
      } else if (type == "qty") {
        return curdata.totalquantity;
      }
      // else if(type=='sku'){
      //   return curdata.total_sku;
      // }
    }
    let groupwise = _.groupBy(
      this.adminmonthlyReports["prevCountryWiseDate"],
      (o) => o.country_id
    );
    if (type == "tot_amt") {
      let sum = this.getSum(groupwise[country_id], "totalsgdvalue");
      return sum;
    }
    if (type == "tot_qty") {
      let sum = this.getSum(groupwise[country_id], "totalquantity");
      return sum;
    }
  }

  getMonthSum(country_id) {
    let curdata = _.filter(this.adminmonthlyReports["countyWiseData"], {
      country_id: country_id,
    });
    console.log("vv", curdata);
    return curdata
      ? curdata.reduce((a, b) => ({
          totalsgdvalue: Number(a.totalsgdvalue) + Number(b.totalsgdvalue),
        }))
      : 0;
  }
  adminStoreAnalysis(cid, type, stype?) {
    let curdata = cid
      ? _.find(this.adminstoreOrders["monoBrandStore"], { country_id: cid })
      : this.adminstoreOrders["monoBrandStore"] || 0;
    let prevdata = cid
      ? _.find(this.adminstoreOrders["multiBrandStore"], { country_id: cid })
      : this.adminstoreOrders["multiBrandStore"] || 0;
    let nonedata =
      _.find(this.adminstoreOrders["none"], { country_id: cid }) || 0;

    if (stype == 1) {
      if (curdata) {
        if (type == "amt") {
          return curdata.totalsgdvalue;
        } else if (type == "qty") {
          return curdata.totalquantity;
        } else if (type == "tot_amt") {
          return curdata && curdata.length > 0
            ? curdata
                .map((o) => parseFloat(o["totalsgdvalue"]))
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue
                )
            : 0;
        } else if (type == "tot_qty") {
          return curdata && curdata.length > 0
            ? curdata
                .map((o) => parseFloat(o["totalquantity"]))
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue
                )
            : 0;
        }
      }
    } else if (stype == 2) {
      if (prevdata) {
        if (type == "amt") {
          return prevdata.totalsgdvalue;
        } else if (type == "qty") {
          return prevdata.totalquantity;
        } else if (type == "tot_amt") {
          return prevdata && prevdata.length > 0
            ? prevdata
                .map((o) => parseFloat(o["totalsgdvalue"]))
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue
                )
            : 0;
        } else if (type == "tot_qty") {
          return prevdata && prevdata.length > 0
            ? prevdata
                .map((o) => parseFloat(o["totalquantity"]))
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue
                )
            : 0;
        }
      }
    } else if (stype == 3) {
      if (nonedata) {
        if (type == "amt") {
          return nonedata.totalsgdvalue;
        } else if (type == "qty") {
          return nonedata.totalquantity;
        }
      }
    } else if (stype == "tot") {
      if (curdata || prevdata || nonedata) {
        if (type == "amt") {
          const mono = curdata ? parseFloat(curdata.totalsgdvalue) : 0;
          const multi = prevdata ? parseFloat(prevdata.totalsgdvalue) : 0;
          const none = nonedata ? parseFloat(nonedata.totalsgdvalue) : 0;
          let sum = mono + multi + none;
          // let sum = curdata ? parseFloat(curdata.totalsgdvalue) : 0 + prevdata ? parseFloat(prevdata.totalsgdvalue) : 0;
          return sum;
        } else if (type == "qty") {
          const cur = curdata ? parseFloat(curdata.totalquantity) : 0;
          const prev = prevdata ? parseFloat(prevdata.totalquantity) : 0;
          // const none = nonedata ? parseFloat(nonedata.totalquantity) : 0;
          return cur + prev;
        } else if (type == "tot_amt") {
          const prev =
            prevdata && prevdata.length > 0
              ? prevdata
                  .map((o) => parseFloat(o["totalsgdvalue"]))
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )
              : 0;
          const cur =
            curdata && curdata.length > 0
              ? curdata
                  .map((o) => parseFloat(o["totalsgdvalue"]))
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )
              : 0;
          return prev + cur;
        } else if (type == "tot_qty") {
          const prev =
            prevdata && prevdata.length > 0
              ? prevdata
                  .map((o) => parseFloat(o["totalquantity"]))
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )
              : 0;
          const cur =
            curdata && curdata.length > 0
              ? curdata
                  .map((o) => parseFloat(o["totalquantity"]))
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )
              : 0;
          return prev + cur;
        }
      }
    }
  }

  adminStoreAnalysisPrev(cid, type, stype?) {
    let curdata = cid
      ? _.find(this.adminstoreOrders["prevMonoBrandStore"], { country_id: cid })
      : this.adminstoreOrders["prevMonoBrandStore"] || 0;
    let prevdata = cid
      ? _.find(this.adminstoreOrders["prevMultiBrandStore"], {
          country_id: cid,
        })
      : this.adminstoreOrders["prevMultiBrandStore"] || 0;
    let nonedata =
      _.find(this.adminstoreOrders["prevNone"], { country_id: cid }) || 0;
    if (stype == 1) {
      if (curdata) {
        if (type == "amt") {
          return curdata.totalsgdvalue;
        } else if (type == "qty") {
          return curdata.totalquantity;
        } else if (type == "tot_amt") {
          // return
          const cur =
            curdata && curdata.length > 0
              ? curdata
                  .map((o) => parseFloat(o["totalsgdvalue"]))
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )
              : 0;
          return cur;
        } else if (type == "tot_qty") {
          const cur =
            curdata && curdata.length > 0
              ? curdata
                  .map((o) => parseFloat(o["totalquantity"]))
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )
              : 0;
          return cur;
        }
      }
    } else if (stype == 2) {
      if (prevdata) {
        if (type == "amt") {
          return prevdata.totalsgdvalue;
        } else if (type == "qty") {
          return prevdata.totalquantity;
        } else if (type == "tot_amt") {
          return prevdata && prevdata.length > 0
            ? prevdata
                .map((o) => parseFloat(o["totalsgdvalue"]))
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue
                )
            : 0;
        } else if (type == "tot_qty") {
          return prevdata && prevdata.length > 0
            ? prevdata
                .map((o) => parseFloat(o["totalquantity"]))
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue
                )
            : 0;
        }
      }
    } else if (stype == 3) {
      if (nonedata) {
        if (type == "amt") {
          return nonedata.totalsgdvalue;
        } else if (type == "qty") {
          return nonedata.totalquantity;
        }
      }
    } else if (stype == "tot") {
      if (curdata || prevdata || nonedata) {
        // console.log('tot_amt')
        if (type == "amt") {
          const mono = curdata ? parseFloat(curdata.totalsgdvalue) : 0;
          const multi = prevdata ? parseFloat(prevdata.totalsgdvalue) : 0;
          const none = nonedata ? parseFloat(nonedata.totalsgdvalue) : 0;
          let sum = mono + multi + none;
          return sum;
        } else if (type == "qty") {
          const prev = prevdata ? parseFloat(prevdata.totalquantity) : 0;
          const cur = curdata ? parseFloat(curdata.totalquantity) : 0;
          // const none = nonedata ? parseFloat(nonedata.totalquantity) : 0;
          return prev + cur;
        } else if (type == "tot_amt") {
          const prev =
            prevdata && prevdata.length > 0
              ? prevdata
                  .map((o) => parseFloat(o["totalsgdvalue"]))
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )
              : 0;
          const cur =
            curdata && curdata.length > 0
              ? curdata
                  .map((o) => parseFloat(o["totalsgdvalue"]))
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )
              : 0;
          return prev + cur;
        } else if (type == "tot_qty") {
          // return
          const prev =
            prevdata && prevdata.length > 0
              ? prevdata
                  .map((o) => parseFloat(o["totalquantity"]))
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )
              : 0;
          const cur =
            curdata && curdata.length > 0
              ? curdata
                  .map((o) => parseFloat(o["totalquantity"]))
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue
                  )
              : 0;
          return prev + cur;
        }
      }
    }
  }

  getSeasonByCountryValue(prevseasonNewId) {
    this.getseasonOrdersbyCountry();
    // this.getOrdersbyTop5Gender();
  }

  getCustomerSeasonComparision() {
    this.divisionWiseGenderOrder();
    this.seasonalOrders();
  }

  public getSeasonByCountryAndTopValue() {
    this.getseasonOrdersbyCountry();
    this.getOrdersbyTop5Gender();
  }

  public getCountryWiseData() {
    this.getOrdersbyTop5Gender();
    this.getseasonOrdersbyCountry();
  }

  public getCustomerWiseFilterData() {
    this.getTotalOrderAmount();
    this.getCategory1WiseTotalOrder(); //
    this.getOrdersbyFranchiseeType();
    this.getOrdersbyGender();
    this.getOrdersbyCountry();
    // this.getOrdersbyTop5MoqArticle();
    this.getOrdersbyTop5Gender();
    this.currentSeasonalOrders(); // 2 tables
    this.getMonthlyWiseReport();
    this.divisionWiseGenderOrder();
  }

  public customerSeasonComparisionData(season_id, type) {
    if (type === "amt") {
      //console.log(this.seasonalOrderComparision)
      const amt =
        this.seasonalOrderComparision && this.seasonalOrderComparision.item
          ? this.seasonalOrderComparision.item.find(
              (o) => o.season_id == season_id
            )
            ? this.seasonalOrderComparision.item.find(
                (o) => o.season_id == season_id
              ).totalorderamount
            : 0
          : 0;
      return amt;
    } else if (type === "qty") {
      const qty =
        this.seasonalOrderComparision && this.seasonalOrderComparision.item
          ? this.seasonalOrderComparision.item.find(
              (o) => o.season_id == season_id
            )
            ? this.seasonalOrderComparision.item.find(
                (o) => o.season_id == season_id
              ).totalquantity
            : 0
          : 0;
      return qty;
    }
  }

  private getChannelList() {
    this.masterService.getCustomerChannels().subscribe(
      (res) => {
        this.channelList = res.data;
      },
      (SError) => {}
    );
  }

  private getStoreList() {
    this.masterService.getStoreTypes().subscribe(
      (res) => {
        this.storeList = res.data;
      },
      (sError) => {}
    );
  }

  public admingenderAnaliseTot(gender_id, type, season_type) {
    //console.log(div_id+"=>"+gen_id);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    if (season_type == 1) {
      let curdata = this.adminDivisionwiseGender["activeSeasondata"]
        ? _.filter(this.adminDivisionwiseGender["activeSeasondata"], {
            gender_id: gender_id,
          })
        : [];

      if (curdata.length > 0) {
        if (type == "amt") {
          return curdata && curdata.length > 0
            ? curdata
                .map((item: any) =>
                  Math.round(parseFloat(item["totalsgdvalue"]))
                )
                .reduce(reducer)
            : 0;
        } else if (type == "qty") {
          return curdata && curdata.length > 0
            ? curdata
                .map((item: any) => Math.round(parseFloat(item["total_qty"])))
                .reduce(reducer)
            : 0;
        } else if (type == "sku") {
          return curdata && curdata.length > 0
            ? curdata
                .map((item: any) => Math.round(parseFloat(item["total_sku"])))
                .reduce(reducer)
            : 0;
        }
      } else {
        if (type == "tot_amt") {
          return this.adminDivisionwiseGender["activeSeasondata"]
            ? this.adminDivisionwiseGender["activeSeasondata"]
                .map((item: any) =>
                  Math.round(parseFloat(item["totalsgdvalue"]))
                )
                .reduce(reducer)
            : 0;
        } else if (type == "tot_qty") {
          return this.adminDivisionwiseGender["activeSeasondata"]
            ? this.adminDivisionwiseGender["activeSeasondata"]
                .map((item: any) => Math.round(parseFloat(item["total_qty"])))
                .reduce(reducer)
            : 0;
        } else if (type == "tot_sku") {
          return this.adminDivisionwiseGender["activeSeasondata"]
            ? this.adminDivisionwiseGender["activeSeasondata"]
                .map((item: any) => Math.round(parseFloat(item["total_sku"])))
                .reduce(reducer)
            : 0;
        } else {
          return 0;
        }
      }
    }
    if (season_type == 2) {
      let prevdata = _.filter(
        this.adminDivisionwiseGender["curyearPrevSeasondata"],
        { gender_id: gender_id }
      );

      if (prevdata.length > 0) {
        if (type == "amt") {
          return prevdata && prevdata.length > 0
            ? prevdata
                .map((item: any) =>
                  Math.round(parseFloat(item["totalsgdvalue"]))
                )
                .reduce(reducer)
            : 0;
        } else if (type == "qty") {
          return prevdata && prevdata.length > 0
            ? prevdata
                .map((item: any) => Math.round(parseFloat(item["total_qty"])))
                .reduce(reducer)
            : 0;
        } else if (type == "sku") {
          return prevdata && prevdata.length > 0
            ? prevdata
                .map((item: any) => Math.round(parseFloat(item["total_sku"])))
                .reduce(reducer)
            : 0;
        }
      } else {
        if (type == "tot_amt") {
          return this.adminDivisionwiseGender["curyearPrevSeasondata"]
            ? this.adminDivisionwiseGender["curyearPrevSeasondata"]
                .map((item: any) =>
                  Math.round(parseFloat(item["totalsgdvalue"]))
                )
                .reduce(reducer)
            : 0;
        } else if (type == "tot_qty") {
          return this.adminDivisionwiseGender["curyearPrevSeasondata"]
            ? this.adminDivisionwiseGender["curyearPrevSeasondata"]
                .map((item: any) => Math.round(parseFloat(item["total_qty"])))
                .reduce(reducer)
            : 0;
        } else if (type == "tot_sku") {
          return this.adminDivisionwiseGender["curyearPrevSeasondata"]
            ? this.adminDivisionwiseGender["curyearPrevSeasondata"]
                .map((item: any) => Math.round(parseFloat(item["total_sku"])))
                .reduce(reducer)
            : 0;
        } else {
          return 0;
        }
      }
    }
  }
}
