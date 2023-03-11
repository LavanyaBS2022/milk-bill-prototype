import * as $ from 'jquery';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import * as SecureLS from 'secure-ls';

import { Common } from './../../shared/service/common/common';

@Component({
  selector: 'admin-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit,OnDestroy,AfterViewInit {
  mobileQuery: MediaQueryList;
  dir = 'ltr';
  green: boolean;
  blue: boolean;
  dark: boolean;
  minisidebar: boolean = true;
  boxed: boolean;
  danger: boolean;
  showHide: boolean;
  sidebarOpened;
  //showSidebar: boolean = true;
  public userDetails: any;

  public config: PerfectScrollbarConfigInterface = {};
  private _mobileQueryListener: () => void;
  public checkUrl:string;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private router:Router,
    public common: Common
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 468px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    let ls = new SecureLS({encodingType: 'aes',encryptionSecret:'cari@tor'});
    // const permission = ls.get("permission");
    // if(permission == '0'){
    //   this.showSidebar = false;
    //   console.log('Showsidebar changes');
    // }
    // this.checkUrl=this.router.url
    // if (permission == '2' && this.checkUrl === '/dashboard/project-list') {
    //   this.showSidebar = false;
    // }
   //console.log(this.showSidebar);

  //  this.userDetails = this.common.getUserDetails();
  //  console.log('this.userDetails',this.userDetails);
  }

  ngOnInit() {


  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {
    //this.showSidebar = this.apidetail.showSidebar;

    // This is for the topbar search
    (<any>$('.srh-btn, .cl-srh-btn')).on('click', function() {
      (<any>$('.app-search')).toggle(200);
    });
    // This is for the megamenu
  }


  // Mini sidebar
  public miniMenu(){
    console.log('I clicked Menu to mini',this.minisidebar);

    if(this.minisidebar == true){
      console.log('its true')
      this.minisidebar = false;
    }
    else{
      console.log('its false')
      this.minisidebar = true;
    }

  }
}
