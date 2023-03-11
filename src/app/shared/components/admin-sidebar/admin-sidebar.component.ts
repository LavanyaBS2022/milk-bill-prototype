import { ChangeDetectorRef,Component,NgZone,OnDestroy,ViewChild,HostListener,Directive,AfterViewInit,OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import {  ActivatedRoute } from '@angular/router';
import { MastersService } from '../../service/masters/masters.service';
import { Common } from '../../service/common/common';

@Component({
    selector: 'app-sidebar',
    templateUrl: './admin-sidebar.component.html'
})
export class AdminSidebarComponent implements OnInit ,OnDestroy {

    public config: PerfectScrollbarConfigInterface = {};
    mobileQuery: MediaQueryList;
    // public menuItems = MenuItems;
    private _mobileQueryListener: () => void;
    status: boolean = true;

    itemSelect:number[]=[]

    subclickEvent() {
        this.status = true;
    }

  public dynamicMenuItems;
  

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        public menuItems: MenuItems,
        private activatedRoute: ActivatedRoute,
        private masterService:MastersService,
        private common : Common
    ) { 
        // console.log('menuItems',this.menuItems);
        this.mobileQuery = media.matchMedia('(min-width: 468px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        // this.dynamicMenuItems = menuItems.getMenuitem();
        this.dynamicMenuItems = common.getLocalStorage('menuList');
        
    }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  



}
