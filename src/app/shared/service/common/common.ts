import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import * as SecureLS from 'secure-ls';
import { ExportToCsv } from 'export-to-csv';
import { saveAs } from 'file-saver';
import { ReportsService } from '../reports/reports.service';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class Common {
    private SecureLS: any;
    constructor(
        public router: Router,
        public snackBar: MatSnackBar,
        public dialog: MatDialog,
        public spinner: NgxSpinnerService,
        private reportSrv: ReportsService,
        private datePipe: DatePipe,
    ) {
        this.SecureLS = new SecureLS({ encodingType: 'aes', encryptionSecret: 'cari@tor' });
    }

    public hasError(field: any, submitted: any) {
        if (field) {
            return (field.invalid && submitted);
        } else {
            return false;
        }
    }

    public hasSuccess(field: any) {
        if (field) {
            return (!field.pristine && field.valid);
        } else {
            return false;
        }
    }

    public apiError(sError) {
        if (sError.status == 401) {
            // alert('Session Expired, Please login to continue');
            this.openSnackBar('Session Expired, Please login to continue', '', 'danger-snackbar')
            window.localStorage.removeItem('mean-token');
            this.router.navigateByUrl('/login');
            return;
        }
        this.openSnackBar('Server Error, Please try later', '', 'danger-snackbar')

    }

    openSnackBar(message: string, action: string, className: string) {
        this.snackBar.open(message, action, {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: [className]
        });
    }

    openConfirmDialog(msg) {
        return this.dialog.open(ConfirmationDialogComponent, {
            width: '390px',
            panelClass: 'confirm-dialog-container',
            disableClose: true,
            data: {
                message: msg
            }
        });
    }

    openAlertDynamic(data: string, logoId: number): void {
        const dialogRef = this.dialog.open(AlertDialogComponent, {
            //   width: '250px',
            data: {
                message: data,
                logo: logoId
            }
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    showSpinner() {
        this.spinner.show();
    }

    hideSpinner() {
        this.spinner.hide();
    }

    setLocalStorage(localStorageName, data) {
        this.SecureLS.set(localStorageName, data);
    }

    getLocalStorage(localStorageName) {
        return this.SecureLS.get(localStorageName);
    }

    clearLocalStorage(localStorageName) {
        return this.SecureLS.clear(localStorageName);
    }

    getUserDetails() {
        return JSON.parse(this.SecureLS.get('userDetails'))
    }

    setUserDetails(data) {
        this.SecureLS.set('userDetails', JSON.stringify(data));
    }

    logout() {
        let a = this.getLocalStorage('rememberMe');

        localStorage.removeItem("mean-token");
        this.SecureLS.clear('userDetails');
        this.SecureLS.clear('modulePermission');
        this.SecureLS.clear('menuList');
        localStorage.removeItem("order-window-id");
        localStorage.removeItem("season-id");
        this.setLocalStorage("rememberMe", a);
    }

    public async csvExporter(data, fileName?: string, columns?: any, title?: string) {
        const options = {
            filename: fileName || 'example',
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            // showLabels: true,
            useTextFile: false,
            useBom: false,
            useKeysAsHeaders: true,
            headers: columns,
            title:title,
            showTitle: true,
        }
        // process with the key here
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(data);
        // saveAs(csvExporter, fileName + '.csv');


    }


    public exportAsExcelFile(fileType: string, filterKey?: any, filterValue?: any): void {
        const params: any = {};
        const date = this.datePipe.transform(new Date(), 'dd_MMM_yy')
        params.fileType = fileType;
        if (filterKey && filterValue) {
            params.field = filterKey;
            params.value = filterValue
        }
        this.reportSrv.getExcelReport(params).subscribe(sResponse => {
            if (sResponse) {
                saveAs(sResponse, fileType.toUpperCase() + '-' + date + '.xlsx');
            }
        }), sError => {

        }
    }

    public exportAsExcelFileParams(seasonId, orderWindowId, brandId, franchiseId, fileType: string, filterKey?: any, filterValue?: any): void {
        const params: any = {};
        const date = this.datePipe.transform(new Date(), 'dd_MMM_yy')
        params.seasonId = seasonId;
        params.orderWindowId = orderWindowId;
        params.brandId = brandId;
        params.franchiseId = franchiseId;
        params.fileType = fileType;
        if (filterKey && filterValue) {
            params.field = filterKey;
            params.value = filterValue
        }
        this.reportSrv.getExcelReportParams(params).subscribe(sResponse => {
            if (sResponse) {
                saveAs(sResponse, fileType.toUpperCase() + '-' + date + '.xlsx');
            }
        }), sError => {

        }
    }

}
