import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MastersService } from '../../../shared/service/masters/masters.service';
import { Common } from '../../../shared/service/common/common';
import { NgxSpinnerService } from "ngx-spinner";
import { MatPaginator, MatTableDataSource } from '@angular/material';
import * as _ from 'lodash';
@Component({
  selector: 'app-daily-milk-collection-form',
  templateUrl: './daily-milk-collection-form.component.html',
  styleUrls: ['./daily-milk-collection-form.component.scss']
})
export class DailyMilkCollectionFormComponent implements OnInit {
  public franchiseAddForm: FormGroup;
  public milkCollectionFilter:FormGroup;
  public submitted = false;
  public isDuplicateFound: boolean = false;
  public regionListDropdown;
  public countryListDropdown;
  public stateListDropdown;
  public cityListDropdown;
  public franchiseTypeListDropdown;
  public brandListDropdown;
  public salesPersonListDropdown;
  public allSalesPersonListDropdown;
  public channelList:any=[];
  public franchiseType;
  public regionId;
  public countryId;
  public stateId;
  public cityId
  public subsidiaryList;
  public mailcustypeList;
  public moqstatusList = [
    { id: 0, name: 'No' },
    { id: 1, name: '12' },
    { id: 2, name: '6' }
  ];
  public maxDate;
  public minDate;
  public mpcsList;
  private mpcsId:number;
  customerList
  mpcsName;
  shifts;
  pourerTypes;
  milkTypes;
  displayedColumns: string[] = ['code','name', 'slno' ,'type','qty','fat', 'snf' ,'clr','rtpl','amount','Actions'];
  // customerList;
  // pourerTypes:
  selectedCustomer;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<customer>(ELEMENT_DATA);

  // public customerList = new MatTableDataSource();
  // public seasonActiveStatus:boolean = false;
  public seasonActiveStatus=[];
  constructor(private formBuilder: FormBuilder, public mastersService: MastersService, public router: Router, private common: Common, private spinner: NgxSpinnerService,private route:ActivatedRoute) {
    // this.getSeasonListDropdown();
    // this.getfranchiseTypeDropdown();
    // this.minDate=new Date();
    // this.minDate.setDate(this.minDate);
    const id=this.route.snapshot.queryParamMap.get('id');
    console.log(id);
    this.mpcsId=id?Number(id):0;
  }
  getSeasonListDropdown() {
    this.mastersService.getRegion().subscribe((data) => {
      // console.log('dropdown', data.data);
      if (data.data) {
        this.regionListDropdown = data.data;
      }
    },
      sError => {
        this.common.apiError(sError);
      });
  }
  getfranchiseTypeDropdown() {
    this.mastersService.getFranchiseeType().subscribe((data) => {
      console.log('dropdown', data.data);
      if (data.data) {
        this.franchiseTypeListDropdown = data.data;
      }
      else {
        //no franchise type
        this.franchiseTypeListDropdown = [];
      }
    },
      sError => {
        this.common.apiError(sError);
      });
  }

  getCountryListDropdown(regionId) {
    // console.log('reached',this.get.regionId.value);
    this.mastersService.getCountry(this.get.regionId.value).subscribe((data) => {
      //console.log('country',data.data);

      if (data.data) {
        this.countryListDropdown = data.data;
        this.stateListDropdown = [];
        this.cityListDropdown = [];
      }
      else {
        //no country found
        this.countryListDropdown = [];
        this.stateListDropdown = [];
        this.cityListDropdown = [];
      }
    },
      sError => {
        this.common.apiError(sError);
      });
  }
  getStateListDropdown(countryId) {
    //console.log('reached',this.get.countryId.value);
    this.mastersService.getState(this.get.countryId.value).subscribe((data) => {
      if (data.data) {
        this.stateListDropdown = data.data;
        this.cityListDropdown = [];
      }
      else {
        //no state found
        this.stateListDropdown = [];
        this.cityListDropdown = [];
      }
    },
      sError => {
        this.common.apiError(sError);
      });
  }
  getCityListDropdown(stateid) {
    this.mastersService.getCity(this.get.stateId.value).subscribe((data) => {
      if (data.data) {
        this.cityListDropdown = data.data;
      }
      else {
        //no city found
        this.cityListDropdown = [];
      }
    },
      sError => {
        this.common.apiError(sError);
      });
  }


  getChannelListDropdown() {
    this.mastersService.getCustomerChannels().subscribe((data) => {
      if (data.data) {
        this.channelList=data.data;
      }
      else {
      }
    },
      sError => {
        this.common.apiError(sError);
      });
  }

  ngOnInit() {
this.milkTypes=[
  {
    id:1,name:'Cow Milk'
   },
   {
    id:2,name:'Buffalo Milk'
   },
]
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

     this.shifts=[
      {
      id:1,name:'Morning'
     },
     {
      id:2,name:'Evening'
     },
    ];

    this.pourerTypes=[
      {
        id:1,name:'pourer Member',value:'P'
       },
       {
        id:2,name:'Non pourer Member',value:'NP'
       },
    ];

    // this.customerList=ELEMENT_DATA;
    // [{
    //   code:'101',
    //   name:'Customer 1',
    //    slno:'P-101' ,
    //    type:'C',
    //    qty:'12',
    //    fat:'3.7',
    //   snf: '8.50',
    //   clr:'29.60',
    //   rtpl:'28.30',
    //   amt:'100'
    //  },
    //  {
    //   code:'102',
    //   name:'Customer 2',
    //    slno:'P-102' ,
    //    type:'C',
    //    qty:'12',
    //    fat:'3.7',
    //   snf: '8.50',
    //   clr:'29.60',
    //   rtpl:'28.30',
    //   amt:'100'
    //  },
    //  {
    //   code:'103',
    //   name:'Customer 3',
    //    slno:'NP-101' ,
    //    type:'C',
    //    qty:'12',
    //    fat:'3.7',
    //   snf: '8.50',
    //   clr:'29.60',
    //   rtpl:'28.30',
    //   amt:'100'
    //  },
    //  {
    //   code:'104',
    //   name:'Customer 4',
    //    slno:'P-103' ,
    //    type:'C',
    //    qty:'12',
    //    fat:'3.7',
    //   snf: '8.50',
    //   clr:'29.60',
    //   rtpl:'28.30',
    //   amt:'100'
    //  },
    //  {
    //   code:'105',
    //   name:'Customer 5',
    //    slno:'NP-102' ,
    //    type:'C',
    //    qty:'12',
    //    fat:'3.7',
    //   snf: '8.50',
    //   clr:'29.60',
    //   rtpl:'28.30',
    //   amt:'100'
    //  },
    //  {
    //   code:'106',
    //   name:'Customer 6',
    //    slno:'P-104' ,
    //    type:'C',
    //    qty:'12',
    //    fat:'3.7',
    //   snf: '8.50',
    //   clr:'29.60',
    //   rtpl:'28.30',
    //   amt:'100'
    //  }]
    // this.milkCollectionFilter=this,this.formBuilder.group({
      
    // });
    this.franchiseAddForm = this.formBuilder.group({
      orderDate:['',Validators.required],
      mpcsName:['',Validators.required],
      shift:['',Validators.required],
      code:['',Validators.required],
      pourerType:['',Validators.required],
      slno:['',Validators.required],
      milkType:['',Validators.required],
      qty:['',Validators.required],
      fat:['',Validators.required],
      snf:['',Validators.required],
      rate:['28.30',Validators.required],
      amount:['',Validators.required],
      name:['',Validators.required],
      clr:['',Validators.required],
      rtpl:['',Validators.required]
    });
   
    this.franchiseAddForm.controls.orderDate.patchValue(new Date());
    // console.log(this.mpcsId);
// console.log(this.mpcsList[this.mpcsId-1].id)
// const mpcsId=this.mpcsList[this.mpcsId-1]?this.mpcsList[this.mpcsId-1].id:'';
if(this.mpcsId>0){
  this.franchiseAddForm.controls.mpcsName.patchValue(this.mpcsList[this.mpcsId-1].id);
  this.mpcsName=this.mpcsList[this.mpcsId-1].id;
}
    
  }

  editCustomer(customer:customer){
console.log(customer);
this.selectedCustomer=customer;
this.get.code.patchValue(customer.code);
this.get.pourerType.patchValue(this.pourerTypes[parseInt(customer.pourerType)-1].id);
this.get.name.patchValue(customer.name);
this.get.milkType.patchValue(this.milkTypes[parseInt(customer.type)-1].id);
this.get.slno.patchValue(customer.slno);
if(parseFloat(customer.qty)>0){
  this.get.qty.patchValue(customer.qty);
  this.get.fat.patchValue(customer.fat);
  this.get.snf.patchValue(customer.snf);
  const amt=parseFloat(customer.rtpl)*parseFloat(customer.qty)
  this.get.amount.patchValue(amt);
}else{
  this.get.qty.patchValue('');
}
// get
  }

  calcualteAmt(qty){
console.log(qty);
this.get.amount.patchValue(this.selectedCustomer.rtpl*qty)

  }

  get get() { return this.franchiseAddForm.controls; }

  public onShiftChange(eventValue){
    this.customerList=_.cloneDeep(ELEMENT_DATA);
    console.log(eventValue)
    // return this.milkCollectionFilter.controls;
  }



  onSubmit() {
    console.log(this.franchiseAddForm.getRawValue());
    const temp=this.franchiseAddForm.getRawValue();
    console.log(this.selectedCustomer);
    temp.clr='29.60';
    temp.rtpl='28.30';
    temp.pourerType='1';
    temp.type='1';
    // const index=this.customerList.findIndex((o)=>(o.code==temp.code));
    this.customerList=_.filter(this.customerList,(o:any)=>(o.code!=this.selectedCustomer.code));
    // console.log(new_array);
    // console.log(index.code);
    // console.log(this.customerList.splice(0,1));
    // this.customerList=delete this.customerList[index];
    
    // this.customerList=Object.assign(new_array,this.selectedCustomer);
    // console.log(this.customerList);
    // delete this.selectedCustomer.orderDate;
    
    this.customerList.push(temp);
    // this.customerList=new_array;
    // this.submitted = true;
    // if (this.franchiseAddForm.invalid) {
    //   this.common.openSnackBar('Please fill all the mandatory fields', '', 'danger-snackbar');
    //   return;
    // }
    // else {
    //   this.spinner.show();
    //   const postData = {
    //     "franchiseName": this.get.franchiseName.value,
    //     "franchiseCode": this.get.franchiseCode.value,
    //     "franchiseType": this.get.franchiseType.value,
    //     "mobile": this.get.mobile.value,
    //     "email": this.get.email.value,
    //     "address": this.get.address.value,
    //     "contactPerson": this.get.contactPerson.value,
    //     "regionId": this.get.regionId.value,
    //     "countryId": this.get.countryId.value,
    //     "stateId": this.get.stateId.value,
    //     "cityId": this.get.cityId.value,
    //     "brandSelected": this.get.brandSelected.value,
    //     "ratio": this.get.ratio.value,
    //     "createdUser": 1,
    //     "createdDate": new Date(),
    //     "status": 1,
    //     "salesuserId": this.get.salesuserId.value,
    //     "subsidiaryId": this.get.subsidiaryId.value,
    //     "customer_type": this.get.customerType.value,
    //     "moq": this.get.moqStatus.value,
    //     "channel_id":this.get.channel.value,
    //     // "orderDate"
    //   };
    //   //console.log('postData', postData);
    //   //return;
    //   this.mastersService.postAddFranchise(postData).subscribe((data) => {
    //     //console.log('data',data);
    //     this.spinner.hide();

    //     if (data.data) {
    //       this.router.navigate(['masters/listFranchise']);
    //       this.common.openSnackBar('New Customer Added Successfully', '', 'success-snackbar');
    //     }
    //     else {
    //       this.common.openSnackBar('Could Not Add Customer', '', 'danger-snackbar');
    //       this.spinner.hide();
    //     }


    //   },
    //     sError => {
    //       this.common.apiError(sError);
    //     });
    // }

  }

  reset() {
    this.common.openSnackBar('Form Reset Successfully', '', 'success-snackbar');
    this.franchiseAddForm.reset();
  }

  updateMaxDate() {
    this.maxDate = new Date(this.get.toDate.value);

    this.maxDate.setDate(this.maxDate.getDate() - 1);
  }
  updateMinDate() {
    this.minDate = new Date(this.get.orderDate.value);
    // console.log("min date",this.minDate )

    this.minDate.setDate(this.minDate.getDate() + 1);
  }

  public getBrandList() {
    this.mastersService.getListBrand().subscribe(
      sResponseModel => {
        if (sResponseModel.data) {
          this.brandListDropdown = sResponseModel.data;
          // console.log('brandListDropdown', this.brandListDropdown);
        }
      },
      sError => {
        this.common.apiError(sError);
      }
    );
  }

  public getSalespersons() {
    this.mastersService.getSalesPerson().subscribe((sResponse: any) => {
      this.salesPersonListDropdown = sResponse.data;
      this.allSalesPersonListDropdown = sResponse.data;

      console.log('Sales persons', sResponse.data);
    }, sError => {
      this.common.openSnackBar('No sales person found', '', 'danger-snackbar');
    });
  }

  public getSubsidiaries() {
    this.mastersService.getSubsidiaries().subscribe((sResponse: any) => {
      this.subsidiaryList = sResponse.data;
      // console.log('Subsidiary',sResponse);
    }, sError => {
      this.common.openSnackBar('No Subsidiaries person found', '', 'danger-snackbar');
    });
  }

  public getmailCustype() {
    this.mastersService.getmailCusTpe().subscribe((sResponse: any) => {
      this.mailcustypeList = sResponse.data;
      console.log(this.mailcustypeList);
    }, sError => {
      this.common.openSnackBar('No Subsidiaries person found', '', 'danger-snackbar');
    });
  }

  selectSubsbsidiary(sid) {
    //console.log('Subid',sid);
    if (sid) {
      this.get.subsidiaryId.setValue(sid);
      // console.log('this.allSalesPersonListDropdown', this.allSalesPersonListDropdown);

      this.salesPersonListDropdown = this.allSalesPersonListDropdown.filter(item => item.subsidiary_id == sid && !item.roleName.includes('Product') && item.userId!=1);

    }

  }

}

const ELEMENT_DATA: customer[] = [
  {
    code:'101',
    name:'Customer 1',
     slno:'P-101' ,
     type:'1',
     qty:'',
     fat:'',
    snf: '',
    clr:'29.60',
    rtpl:'28.30',
    amt:'',
    pourerType:'1',
    // rate:
   },
   {
    code:'102',
    name:'Customer 2',
     slno:'P-102' ,
     type:'1',
     qty:'',
     fat:'',
    snf: '',
    clr:'29.60',
    rtpl:'28.30',
    amt:'',
    pourerType:'1'
   },
   {
    code:'103',
    name:'Customer 3',
     slno:'NP-101' ,
     type:'1',
     qty:'',
     fat:'',
    snf: '',
    clr:'29.60',
    rtpl:'28.30',
    amt:'',
    pourerType:'2'
   },
   {
    code:'104',
    name:'Customer 4',
     slno:'P-103' ,
     type:'1',
     qty:'',
     fat:'',
    snf: '',
    clr:'29.60',
    rtpl:'28.30',
    amt:'',
    pourerType:'1'
   },
   {
    code:'105',
    name:'Customer 5',
     slno:'NP-102' ,
     type:'1',
     qty:'',
     fat:'',
    snf: '',
    clr:'29.60',
    rtpl:'28.30',
    amt:'',
    pourerType:'2'
   },
   {
    code:'106',
    name:'Customer 6',
     slno:'P-104' ,
     type:'1',
     qty:'',
     fat:'',
    snf: '',
    clr:'29.60',
    rtpl:'28.30',
    amt:'',
    pourerType:'1'
   }
];

interface customer{
   code: string; name: string; slno: string; type: string; qty: string; fat: string; snf: string; clr: string; rtpl: string; amt: string;
   pourerType:string
}