import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatMenuTrigger, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppMenuComponent {

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { }
}
