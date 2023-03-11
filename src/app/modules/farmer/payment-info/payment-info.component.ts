import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { MatPaginator, MatTableDataSource } from "@angular/material";

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {
  farmersLedgerForm: FormGroup;
  maxDate;
  minDate;
  mpcsList;
  customers;
  dailyCollectionDetails;
  displayedColumns: string[] = ["date","name", "description"];
  // customerList;
  // pourerTypes:
  selectedMpcs;
  monthDays: string[];
  monthlydata;
  notification;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<customer>(ELEMENT_DATA);
  constructor(private datePipe: DatePipe) {
    this.monthDays = [];
    this.monthlydata = [];
    this.dailyCollectionDetails = [];
  }

  ngOnInit() {
    // this.dateRange("1-10-22", "31-10-22");
    this.farmersLedgerForm = new FormGroup({
      fromDate: new FormControl(""),
      toDate: new FormControl(""),
      mpcsName: new FormControl(""),
      customer: new FormControl(""),
    });

    // console.log(this.displayedColumns);

    this.notification=[
      {
        date:'01-03-23',
        name:'Amount Credited ',
        description:'6000 Balance Amount Credited to your bank account'
      },
      {
        date:'15-03-23',
        name:'Amount Debited',
        description:'Cattle feed indent bill no-345 amount debited from your balance'
      },
      {
        date:'17-03-23',
        name:'Amount Credited',
        description:'4000 Balance Amount Credited to your bank account'
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

  get get() {
    return this.farmersLedgerForm.controls;
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

  updateMinDate2() {
    // this.maxDate.setDate(new Date(this.get.fromDate.value).getDate() - 1);
    const toDate = new Date(this.get.toDate.value);
    console.log("min date", this.minDate);
    const fromDate = this.datePipe.transform(this.minDate, "dd-MM-yy");
    // this.dateRange(fromDate, this.datePipe.transform(toDate, "dd-MM-yy"));

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

