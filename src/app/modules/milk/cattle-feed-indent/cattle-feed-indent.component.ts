import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Common } from "../../../shared/service/common/common";

@Component({
  selector: 'app-cattle-feed-indent',
  templateUrl: './cattle-feed-indent.component.html',
  styleUrls: ['./cattle-feed-indent.component.scss']
})
export class CattleFeedIndentComponent implements OnInit {
  farmersLedgerForm: FormGroup;
  cattleFeedForm:FormGroup;
  maxDate;
  minDate;
  mpcsList;
  customers;
  selectedCustomer;
  dailyCollectionDetails;
  displayedColumns: string[] = ["SlNo", "Name", "Batch"];
  // customerList;
  // pourerTypes:
  selectedMpcs;
  monthDays: string[];
  monthlydata;
  currentDate:Date;
  packets;
  selectedPackets;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<customer>(ELEMENT_DATA);
  constructor(private datePipe: DatePipe,private common:Common) {
    this.monthDays = [];
    this.monthlydata = [];
    this.dailyCollectionDetails = [];
    this.currentDate=new Date();
    this.packets=[];
    this.selectedPackets=[];
  }

  ngOnInit() {
    // this.dateRange("1-10-22", "31-10-22");
    this.farmersLedgerForm = new FormGroup({
      fromDate: new FormControl(new Date()),
      toDate: new FormControl(""),
      mpcsName: new FormControl(""),
      customer: new FormControl(""),
      // packets: new FormArray([]),
      packetName:new FormControl(""),
      bag:new FormControl("")
    });

    this.cattleFeedForm= new FormGroup({
      packetName:new FormControl(""),
      bag:new FormControl(""),
      kg:new FormControl(""),
      rate:new FormControl(""),
      amt:new FormControl(""),
    });

    // console.log(this.displayedColumns);

    this.packets=[
      {
        name:'By-pass Cattle Feed',
        id:1,
        pack_size:25,
        rate:500,

      },
      {
        name:'Nandini Gold (Formely type-1) Cattle Feed',
        id:1,
        pack_size:20,
        rate:550,

      },
      {
        name:'Urea Molasses Block ',
        id:1,
        pack_size:25,
        rate:400,

      },
      {
        name:'Calf Feed',
        id:1,
        pack_size:25,
        rate:600,

      },
      {
        name:'Bull Feed',
        id:1,
        pack_size:50,
        rate:700,

      },
    ]
    this.mpcsList = [
      {
        id: 1,
        name: "Siddapura",
        capacity: 165,
      },
      {
        id: 2,
        name: "K. Abtur",
        capacity: 140,
      },
      {
        id: 3,
        name: "Ranganathpur",
        capacity: 150,
      },
      {
        id: 4,
        name: "kadanur",
        capacity: 145,
      },
    ];
    this.customers = [
      {
        id: 1,
        name: "Customer 1",
      },
      {
        id: 2,
        name: "Customer 2",
      },
      {
        id: 3,
        name: "Customer 3",
      },
      {
        id: 4,
        name: "Customer 4",
      },
      {
        id: 5,
        name: "Customer 5",
      },
      {
        id: 6,
        name: "Customer 6",
      },
    ];
    // this.ledgerDetails=ELEMENT_DATA;
  }

  onCustomer(customerId){
    this.selectedCustomer=this.customers[customerId-1];
console.log(customerId);
  }

  calculateValue(value){
    console.log(value);
   console.log(this.cattleFeedFormControls.packetName.value)
   const packet=this.cattleFeedFormControls.packetName.value;
   this.cattleFeedFormControls.kg.patchValue(packet.pack_size*value);
   this.cattleFeedFormControls.rate.patchValue(packet.rate);
   this.cattleFeedFormControls.amt.patchValue(packet.rate*value);


  }

  addPacket(){
    this.selectedPackets.push({
      packetName:this.cattleFeedFormControls.packetName.value.name,
      qty:this.cattleFeedFormControls.bag.value,
      kg:this.cattleFeedFormControls.kg.value,
      rate:this.cattleFeedFormControls.rate.value,
      amt:this.cattleFeedFormControls.bag.value*this.cattleFeedFormControls.rate.value,
    });
    this.cattleFeedForm.reset();
  }

  onSubmit(){
    this.common.openSnackBar('Indent added Successfully ','','success-snackbar')
  //  this.msgSrv.add() 
  }

  get get() {
    return this.farmersLedgerForm.controls;
  }

  get cattleFeedFormControls(){
    return this.cattleFeedForm.controls;
  }

  dateRange(fromDate, toDate) {
    this.dailyCollectionDetails=[];
    this.displayedColumns = ["SlNo", "Name", "Batch"]
    const startDate = fromDate.split("-");
    const endDate = toDate.split("-");
      for (let i = startDate[0]; i <= endDate[0]; i++) {
        const num = i!=startDate[0]?i < 10 ? "0" + i : i:i;
        const date = num + "-" + startDate[1] + "-" + startDate[2];
        this.displayedColumns.push(date);
        this.monthDays.push(date);
      }
      const temp = {};
      const temp1 = {};
      for (let i = 0; i < this.monthDays.length; i++) {
        temp[this.monthDays[i]] = 3.5;
        temp1[this.monthDays[i]] = 2.5;
      }

      for (let i = 0; i < this.customers.length; i++) {
        // console.log({'SlNo':1,'Name':this.customers[i].name,'Batch':'Morning'},temp);
        const obj1 = {
          SlNo: i + 1,
          Name: this.customers[i].name,
          Batch: "Morning",
        };
        const morning = Object.assign(obj1, temp);
        const obj2 = {
          SlNo: "",
          Name: "",
          Batch: "Evening",
        };

        const evening = Object.assign(obj2, temp1);
        // console.log({...obj1,...temp})
        this.dailyCollectionDetails.push(morning);
        this.dailyCollectionDetails.push(evening);
      // }
      console.log(this.displayedColumns);
      console.log(this.dailyCollectionDetails);
    }
  }

  onChangeMpcs(mpcsId) {
    this.selectedMpcs = this.mpcsList[mpcsId - 1];
  }

  updateMaxDate() {
    this.maxDate = new Date(this.get.fromDate.value);

    
  }
  updateMinDate() {
    this.minDate = new Date(this.get.fromDate.value);
    console.log("min date", this.datePipe.transform(this.minDate, "dd-MM-yy"));

    this.minDate.setDate(this.minDate.getDate() + 1);
  }

  
  deleteRow(row: any) {
    const index = this.selectedPackets.indexOf(row);
    if (index !== -1) {
      this.selectedPackets.splice(index, 1);
    }
  }

  updateMinDate2() {
    // this.maxDate.setDate(new Date(this.get.fromDate.value).getDate() - 1);
    const toDate = new Date(this.get.toDate.value);
    console.log("min date", this.minDate);
    const fromDate = this.datePipe.transform(this.minDate, "dd-MM-yy");
    this.dateRange(fromDate, this.datePipe.transform(toDate, "dd-MM-yy"));

    this.minDate.setDate(this.minDate.getDate() + 1);
  }
}



const ELEMENT_DATA: customer[] = [
  {
    ledgerDate: "01-11-22",
    Particulars: "Opening balance @ 01-11-22",
    dr: "-",
    cr: "350.00",
    balance: 350.0,
  },
  {
    ledgerDate: "01-11-22",
    Particulars: "Morning Cow Milk 2.8 LTR @ 28.3",
    dr: "-",
    cr: "79.24",
    balance: 429.24,
  },
  {
    ledgerDate: "01-11-22",
    Particulars: "Evening Cow Milk 2.5 LTR @ 28.3",
    dr: "-",
    cr: "70.45",
    balance: 499.99,
  },
  {
    ledgerDate: "02-11-22",
    Particulars: "Morning Cow Milk 2.8 LTR @ 28.3",
    dr: "-",
    cr: "56.60",
    balance: 556.59,
  },
  {
    ledgerDate: "02-11-22",
    Particulars: "Evening Cow Milk 2.5 LTR @ 28.3",
    dr: "-",
    cr: "73.58",
    balance: 630.17,
  },
  {
    ledgerDate: "03-11-22",
    Particulars: "Morning Cow Milk 2.8 LTR @ 28.3",
    dr: "-",
    cr: "70.78",
    balance: 700.92,
  },
  {
    ledgerDate: "03-11-22",
    Particulars: "Evening Cow Milk 2.5 LTR @ 28.3",
    dr: "-",
    cr: "70.75",
    balance: 771.9,
  },
  {
    ledgerDate: "04-11-22",
    Particulars: "Morning Cow Milk 2.8 LTR @ 28.3",
    dr: "-",
    cr: "79.70",
    balance: 850.8,
  },
  {
    ledgerDate: "04-11-22",
    Particulars: "Evening Cow Milk 2.5 LTR @ 28.3",
    dr: "-",
    cr: "70.56",
    balance: 920,
  },
  {
    ledgerDate: "01-11-22",
    Particulars: "Cattle Feed Purchased Bill No-350",
    dr: "845",
    cr: "-",
    balance: 70,
  },
];

interface customer {
  ledgerDate: string;
  Particulars: string;
  dr: string;
  cr: string;
  balance: number;
}
