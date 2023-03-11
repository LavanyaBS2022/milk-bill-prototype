import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart, NavigationCancel, NavigationError  } from '@angular/router';
import { Common } from './shared/service/common/common';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./_app.component.scss']
})
export class AppComponent {
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private common : Common
    ) {
    }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            // if (!(evt instanceof NavigationEnd)) {
            //   return;
            // }
      
            if (evt instanceof NavigationStart) {
                // console.log('NavigationStart.......')
                this.common.showSpinner();
            }
            if (evt instanceof NavigationEnd) {
                // console.log('NavigationEnd.......')
                this.common.hideSpinner();
            }
      
            // Set loading state to false in both of the below events to hide the spinner in case a request fails
            if (evt instanceof NavigationCancel) {
                // console.log('NavigationCancel.......')
                this.common.hideSpinner();
            }
            if (evt instanceof NavigationError) {
                // console.log('NavigationError.......')
                this.common.hideSpinner();
            }
            
      
            window.scrollTo(0, 0);
            
          });
    }
}
