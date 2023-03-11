import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppConfigService } from '../../../shared/service/common/app-config.service';
import { ExchangeRates } from '../../../models/exchangeRates';
@Injectable({
    providedIn: 'root'
})
export class MastersService {
    public getlistSeasonUrl;
    public getAddSeasonUrl;
    public getEditSeasonUrl;
    public updateActiveSeasonStatusUrl;
    public getValidateSeasonCodeUrl;
    public getSeasonTypeUrl;
    public getDeleteSeasonUrl;
    public updateOrderWindowMapCustomerUrl;
    public getAddOrderWindowUrl;
    public getlistOrderWindowUrl;
    public getEditOrderWindowUrl;
    public getDeleteOrderWindowUrl;

    public getAddRBUUrl;
    public getEditRBUUrl;
    public getListRBUUrl;
    public getDeleteRBUUrl;

    public getAddProductTypeUrl;
    public getEditProductTypeUrl;
    public getListProductTypeUrl;
    public getDeleteProductTypeUrl;

    public getAddGenderUrl;
    public getEditGenderUrl;
    public getListGenderUrl;
    public getDeleteGenderUrl;

    public getAddDivisionUrl;
    public getEditDivisionUrl;
    public getListDivisionUrl;
    public getDeleteDivisionUrl;

    public getAddBrandUrl;
    public getEditBrandUrl;
    public getListBrandUrl;
    public getDeleteBrandUrl;

    public getAddRegionUrl;
    public getEditRegionUrl;
    public getListRegionUrl;
    public getDeleteRegionUrl;

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    public getAddFranchiseUrl;
    public getlistFranchiseUrl;
    public getlistFranchiseOrderWindowMapUrl;
    public getEditFranchiseUrl;
    public getDeleteFranchiseUrl;
    public getFranchiseeTypeUrl;

    public getAddFranchiseStoreUrl;
    public getlistFranchiseStoreUrl;
    public getEditFranchiseStoreUrl;
    public getDeleteFranchiseStoreUrl;


    public getRegionUrl;
    public getCountryUrl;
    public getStateUrl;
    public getCityUrl;
    private importFranchaiseUrl;
    private exportMasterUrl;
    public importOrdersheetUrl;
    private importConsolidateUrl;
    private getBrandListByFranchiseIdUrl;
    private importExcelUrl: string;
    private getOrderWindowSeasonListUrl: string;
    private getOrderWindowSeasonListUrl2: string;

    private checkStoreHasAlreadyThisBrandUrl: string;
    private listFileLogsUrl;
    private downloadFilelogUrl;

    private getCountrylistUrl: string;

    public getDivisionListSeasonOwWiseUrl;
    public getGenderListSeasonOwWiseUrl;
    public getCategory1ListSeasonOwWiseUrl;
    public getCategory4ListSeasonOwWiseUrl;
    public getArticleListSeasonOwWiseUrl;
    public importSuggestedArticleUrl;
    private getArticleDetailUrl;
    private getInfoSizeUrl;
    private deleteSizeUrl;
    public articlesImageUploadUrl;
    private salesPersonUrl: string;
    private subsidiaryUrl: string;
    private mailsendCustypeUrl: string;
    private getCategory4Url: string;
    private getItemCodeUrl: string;
    private getPackNameUrl: string;
    private getRemarksUrl: string;
    private getOgLaunchMonthUrl: string;
    private importOrdersheetNewUrl: string;
    private addCountryPriceUrl: string
    private getItemNameUrl: string;
    private exportMappedDetails: string;

    private getCustomerChannelsUrl:string;
    private getStoreTypesUrl:string;
    private getExchangeRatesUrl:string;
    private updateExchangeRatesUrl:string;
    private orderWindowLabelUrl:string;
    private orderWindowListUrl:string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private readonly appConfig: AppConfigService,
    ) {
        this.getCategory4Url = this.appConfig.generateApiUrl('masters.getCategory4');
        // this.addCountryPriceUrl = this.appConfig.generateApiUrl('masters.addCountryPrice');
        //  this.addCountryPriceUrl =
        this.getItemCodeUrl = this.appConfig.generateApiUrl('masters.getItemCode');
        this.getPackNameUrl = this.appConfig.generateApiUrl('masters.getPackName');
        this.getRemarksUrl = this.appConfig.generateApiUrl('masters.getRemarks');
        this.getOgLaunchMonthUrl = this.appConfig.generateApiUrl('masters.getOgLaunchMonth');
        this.getItemNameUrl = this.appConfig.generateApiUrl('masters.getItemName');

        this.getlistSeasonUrl = this.appConfig.generateApiUrl('masters.listSeason');
        this.getAddSeasonUrl = this.appConfig.generateApiUrl('masters.addSeason');
        this.getEditSeasonUrl = this.appConfig.generateApiUrl('masters.editSeason');
        this.updateActiveSeasonStatusUrl = this.appConfig.generateApiUrl('masters.updateActiveSeasonStatus');


        this.getValidateSeasonCodeUrl = this.appConfig.generateApiUrl('masters.validateSeasonCode');
        this.getSeasonTypeUrl = this.appConfig.generateApiUrl('masters.SeasonTypeList');
        this.getDeleteSeasonUrl = this.appConfig.generateApiUrl('masters.deleteSeason');

        this.getAddOrderWindowUrl = this.appConfig.generateApiUrl('masters.addOrderWindow');
        this.getEditOrderWindowUrl = this.appConfig.generateApiUrl('masters.editOrderWindow');
        this.getlistOrderWindowUrl = this.appConfig.generateApiUrl('masters.listOrderWindow');
        this.getDeleteOrderWindowUrl = this.appConfig.generateApiUrl('masters.deleteOrderWindow');

        this.getAddRBUUrl = this.appConfig.generateApiUrl('masters.addRBU');
        this.getListRBUUrl = this.appConfig.generateApiUrl('masters.listRBU');
        this.getDeleteRBUUrl = this.appConfig.generateApiUrl('masters.deleteRBU');
        this.getEditRBUUrl = this.appConfig.generateApiUrl('masters.editRBU');

        this.getAddProductTypeUrl = this.appConfig.generateApiUrl('masters.addProductType');
        this.getListProductTypeUrl = this.appConfig.generateApiUrl('masters.listProductType');
        this.getDeleteProductTypeUrl = this.appConfig.generateApiUrl('masters.deleteProductType');
        this.getEditProductTypeUrl = this.appConfig.generateApiUrl('masters.updateProdctType');

        this.getAddGenderUrl = this.appConfig.generateApiUrl('masters.addGender');
        this.getListGenderUrl = this.appConfig.generateApiUrl('masters.listGender');
        this.getDeleteGenderUrl = this.appConfig.generateApiUrl('masters.deleteGender');
        this.getEditGenderUrl = this.appConfig.generateApiUrl('masters.updateGender');

        this.getAddDivisionUrl = this.appConfig.generateApiUrl('masters.addDivision');
        this.getListDivisionUrl = this.appConfig.generateApiUrl('masters.listDivision');
        this.getDeleteDivisionUrl = this.appConfig.generateApiUrl('masters.deleteDivision');
        this.getEditDivisionUrl = this.appConfig.generateApiUrl('masters.updateDivision');

        this.getAddBrandUrl = this.appConfig.generateApiUrl('masters.addBrand');
        this.getListBrandUrl = this.appConfig.generateApiUrl('masters.listBrand');
        this.getDeleteBrandUrl = this.appConfig.generateApiUrl('masters.deleteBrand');
        this.getEditBrandUrl = this.appConfig.generateApiUrl('masters.updateBrand');

        this.getAddRegionUrl = this.appConfig.generateApiUrl('masters.addRegion');
        this.getListRegionUrl = this.appConfig.generateApiUrl('masters.listRegion');
        this.getDeleteRegionUrl = this.appConfig.generateApiUrl('masters.deleteRegion');
        this.getEditRegionUrl = this.appConfig.generateApiUrl('masters.updateRegion');

        this.getAddFranchiseUrl = this.appConfig.generateApiUrl('masters.addFranchise');
        this.getEditFranchiseUrl = this.appConfig.generateApiUrl('masters.editFranchise');
        this.getlistFranchiseUrl = this.appConfig.generateApiUrl('masters.listFranchise');
        this.getlistFranchiseOrderWindowMapUrl = this.appConfig.generateApiUrl('masters.listFranchiseOrderWindowMap');

        this.getDeleteFranchiseUrl = this.appConfig.generateApiUrl('masters.deleteFranchise');
        this.getFranchiseeTypeUrl = this.appConfig.generateApiUrl('masters.getFranchiseeType');

        this.getAddFranchiseStoreUrl = this.appConfig.generateApiUrl('masters.addFranchiseStore');
        this.getEditFranchiseStoreUrl = this.appConfig.generateApiUrl('masters.editFranchiseStore');
        this.getlistFranchiseStoreUrl = this.appConfig.generateApiUrl('masters.listFranchiseStore');
        this.getDeleteFranchiseStoreUrl = this.appConfig.generateApiUrl('masters.deleteFranchiseStore');


        this.getRegionUrl = this.appConfig.generateApiUrl('masters.getRegion');
        this.getCountryUrl = this.appConfig.generateApiUrl('masters.getCountry');
        this.getStateUrl = this.appConfig.generateApiUrl('masters.getState');
        this.getCityUrl = this.appConfig.generateApiUrl('masters.getCity');
        this.importExcelUrl = this.appConfig.generateApiUrl('masters.importExcel');
        this.importFranchaiseUrl = this.appConfig.generateApiUrl('masters.importFranchaise');
        this.exportMasterUrl = this.appConfig.generateApiUrl('masters.exportMaster');
        this.importOrdersheetUrl = this.appConfig.generateApiUrl('masters.importOrdersheet');
        this.importConsolidateUrl = this.appConfig.generateApiUrl('masters.importConsolidate');
        this.importFranchaiseUrl = this.appConfig.generateApiUrl('masters.importFranchaise');
        this.listFileLogsUrl = this.appConfig.generateApiUrl('masters.listFileLogs');
        this.downloadFilelogUrl = this.appConfig.generateApiUrl('masters.downloadFilelog');
        this.getOrderWindowSeasonListUrl = this.appConfig.generateApiUrl('masters.getOrderWindowSeasonList');
        this.getOrderWindowSeasonListUrl2 = this.appConfig.generateApiUrl('masters.getOrderWindowSeasonList2');

        this.getBrandListByFranchiseIdUrl = this.appConfig.generateApiUrl('masters.getBrandListByFranchiseId');
        this.checkStoreHasAlreadyThisBrandUrl = this.appConfig.generateApiUrl('masters.checkStoreHasAlreadyThisBrand');

        this.getDivisionListSeasonOwWiseUrl = this.appConfig.generateApiUrl('masters.getDivisionListSeasonOwWise');
        this.getGenderListSeasonOwWiseUrl = this.appConfig.generateApiUrl('masters.getGenderListSeasonOwWise');
        this.getCategory1ListSeasonOwWiseUrl = this.appConfig.generateApiUrl('masters.getCategory1ListSeasonOwWise');
        this.getCategory4ListSeasonOwWiseUrl = this.appConfig.generateApiUrl('masters.getCategory4ListSeasonOwWise');
        this.getArticleListSeasonOwWiseUrl = this.appConfig.generateApiUrl('masters.getArticleListSeasonOwWise');
        this.importSuggestedArticleUrl = this.appConfig.generateApiUrl('masters.importSuggestedArticle');
        this.getArticleDetailUrl = this.appConfig.generateApiUrl('masters.getArticleDetail');
        this.getInfoSizeUrl = this.appConfig.generateApiUrl('masters.getInfoSize');
        this.deleteSizeUrl = this.appConfig.generateApiUrl('masters.deleteSize');
        this.articlesImageUploadUrl = this.appConfig.generateApiUrl('masters.articleImageUpload');
        this.salesPersonUrl = this.appConfig.generateApiUrl('users.getsalesPerson');
        this.subsidiaryUrl = this.appConfig.generateApiUrl('users.getSubsidiaries');
        this.mailsendCustypeUrl = this.appConfig.generateApiUrl('users.getmailCustype');

        this.updateOrderWindowMapCustomerUrl = this.appConfig.generateApiUrl('masters.updateOrderWindowMapCustomer');
        this.importOrdersheetNewUrl = this.appConfig.generateApiUrl('masters.importOrdersheetNew');
        this.exportMappedDetails = this.appConfig.generateApiUrl('report.exportMappedDetails');

        this.getCustomerChannelsUrl=this.appConfig.generateApiUrl('masters.getCustomerChannels');
        this.getStoreTypesUrl=this.appConfig.generateApiUrl('masters.getStoreTypes');
        this.getExchangeRatesUrl=this.appConfig.generateApiUrl('masters.getExchangeRates');
        this.updateExchangeRatesUrl=this.appConfig.generateApiUrl('masters.updateExchangeRates');
        this.orderWindowLabelUrl=this.appConfig.generateApiUrl('masters.orderWindowLabel');
        this.orderWindowListUrl=this.appConfig.generateApiUrl('masters.orderWindowList');
    }
    getlistSeason(): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getlistSeasonUrl, options);
    }
    getlistSeasonById(editId): Observable<any> {
        const queryParams = new HttpParams()
            .set('editId', editId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getlistSeasonUrl, options);
    }
    getValidateSeasonCode(seasonCode): Observable<any> {
        const queryParams = new HttpParams()
            .set('seasonCode', seasonCode);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getValidateSeasonCodeUrl, options);
    }
    postAddSeason(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getAddSeasonUrl, dataObj, options);
    }
    postEditSeason(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getEditSeasonUrl, dataObj, options);
    }
    updateActiveSeasonStatus(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.updateActiveSeasonStatusUrl, dataObj, options);
    }
    updateOrderWindowMapCustomer(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.updateOrderWindowMapCustomerUrl, dataObj, options);
    }

    getSeasonTypelist(): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getSeasonTypeUrl, options);
    }
    getDeleteSeason(seasonId): Observable<any> {
        const queryParams = new HttpParams()
            .set('seasonId', seasonId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getDeleteSeasonUrl, options);
    }

    getlistOrderWindow(): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getlistOrderWindowUrl, options);
    }
    getlistOrderWindowById(editId): Observable<any> {
        const queryParams = new HttpParams()
            .set('editId', editId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getlistOrderWindowUrl, options);
    }
    postAddOrderWindow(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getAddOrderWindowUrl, dataObj, options);
    }
    addCountryPrice(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.addCountryPriceUrl, dataObj, options);
    }

    postEditOrderWindow(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getEditOrderWindowUrl, dataObj, options);
    }
    getDeleteOrderWindow(orderWindowId): Observable<any> {
        const queryParams = new HttpParams()
            .set('orderWindowId', orderWindowId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getDeleteOrderWindowUrl, options);
    }
    getFranchiseeType(): Observable<any> {
        const queryParams = new HttpParams();
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getFranchiseeTypeUrl, options);
    }

    //masters

    //#region  RBU OR CATEGORY4 MASTER SCREEN
    postAddRBU(dataObj = {}): Observable<any> {
        // console.log('postAddRBU service called');
        const queryParams = {};
        // console.log('queryParams:', queryParams);
        // console.log('dataObj:', dataObj);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getAddRBUUrl, dataObj, options);
    }

    getListRBU(): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getListRBUUrl, options);
    }

    getDeleteRBU(rbuId): Observable<any> {
        const queryParams = new HttpParams().set('rbuId', rbuId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getDeleteRBUUrl, options);
    }

    postEditRBU(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getEditRBUUrl, dataObj, options);
    }

    getListRBUbyId(editrbuId): Observable<any> {
        const queryParams = new HttpParams().set('editrbuId', editrbuId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getListRBUUrl, options);
    }

    //#endregion RBU OR CATEGORY4 MASTER SCREEN

    //#region PRODUCT TYPE OR CATEGORY1 MASTER SCREEN

    postAddProductType(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getAddProductTypeUrl, dataObj, options);
    }

    getListProductType(): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getListProductTypeUrl, options);
    }

    getDeleteProductType(delProdTypeId): Observable<any> {
        const queryParams = new HttpParams().set('delProdTypeId', delProdTypeId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getDeleteProductTypeUrl, options);
    }

    postUpdateProductType(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getEditProductTypeUrl, dataObj, options);
    }

    getListProductTypebyId(editProdTypeId): Observable<any> {
        const queryParams = new HttpParams().set('editProdTypeId', editProdTypeId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getListProductTypeUrl, options);
    }

    //#endregion PRODUCT TYPE OR CATEGORY1 MASTER SCREEN

    //#region GENDER MASTER SCREEN

    postAddGender(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getAddGenderUrl, dataObj, options);
    }

    getListGender(): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getListGenderUrl, options);
    }

    getDeleteGender(delGenderId): Observable<any> {
        const queryParams = new HttpParams().set('delGenderId', delGenderId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getDeleteGenderUrl, options);
    }

    postUpdateGender(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getEditGenderUrl, dataObj, options);
    }

    getListGenderbyId(editGenderId): Observable<any> {
        const queryParams = new HttpParams().set('editGenderId', editGenderId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getListGenderUrl, options);
    }

    //#endregion GENDER MASTER SCREEN

    //#region DIVISION MASTER SCREEN

    postAddDivision(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getAddDivisionUrl, dataObj, options);
    }

    getListDivision(): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getListDivisionUrl, options);
    }

    getDeleteDivision(delDivisionId): Observable<any> {
        const queryParams = new HttpParams().set('delDivisionId', delDivisionId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getDeleteDivisionUrl, options);
    }

    postUpdateDivision(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getEditDivisionUrl, dataObj, options);
    }

    getListDivisionbyId(editDivisionId): Observable<any> {
        const queryParams = new HttpParams().set('editDivisionId', editDivisionId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getListDivisionUrl, options);
    }

    //#endregion DIVISION MASTER SCREEN

    //#region BRAND MASTER SCREEN

    postAddBrand(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getAddBrandUrl, dataObj, options);
    }

    getListBrand(): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getListBrandUrl, options);
    }

    getDeleteBrand(delBrandId): Observable<any> {
        const queryParams = new HttpParams().set('delBrandId', delBrandId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getDeleteBrandUrl, options);
    }

    postUpdateBrand(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getEditBrandUrl, dataObj, options);
    }

    getListBrandbyId(editBrandId): Observable<any> {
        const queryParams = new HttpParams().set('editBrandId', editBrandId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getListBrandUrl, options);
    }

    //#endregion BRAND MASTER SCREEN

    //#region REGION MASTER SCREEN

    postAddRegion(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getAddRegionUrl, dataObj, options);
    }

    getListRegion(): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getListRegionUrl, options);
    }

    getDeleteRegion(delRegionId): Observable<any> {
        const queryParams = new HttpParams().set('delRegionId', delRegionId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getDeleteRegionUrl, options);
    }

    postUpdateRegion(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getEditRegionUrl, dataObj, options);
    }

    getListRegionbyId(editRegionId): Observable<any> {
        const queryParams = new HttpParams().set('editRegionId', editRegionId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getListRegionUrl, options);
    }

    //#endregion REGION MASTER SCREEN

    getRegion(): Observable<any> {
        const queryParams = new HttpParams();
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getRegionUrl, options);
    }
    getCountry(regionId?: any,subsidiary_id=0): Observable<any> {
        const queryParams = new HttpParams()
            .set('regionId', regionId);
           // .set('subsidiary_id',subsidiary_id.toString());
        // console.log(queryParams);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getCountryUrl, options);
    }
    getState(countryId): Observable<any> {
        const queryParams = new HttpParams()
            .set('countryId', countryId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getStateUrl, options);
    }
    getCity(stateId): Observable<any> {
        const queryParams = new HttpParams()
            .set('stateId', stateId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getCityUrl, options);
    }
    //franchise SERVICES
    getlistFranchise(roleId?, userid?, subsidiaryId?): Observable<any> {
        const queryParams = new HttpParams()
            .set('roleId', roleId)
            .set('userId', userid)
            .set('subsidiaryId', subsidiaryId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getlistFranchiseUrl, options);
    }
    getlistFranchiseOrderWindowMap(roleId?, userid?, subsidiaryId?): Observable<any> {
        const queryParams = new HttpParams()
            .set('roleId', roleId)
            .set('userId', userid)
            .set('subsidiaryId', subsidiaryId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getlistFranchiseOrderWindowMapUrl, options);
    }


    getlistFranchiseById(editId): Observable<any> {
        const queryParams = new HttpParams()
            .set('editId', editId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getlistFranchiseUrl, options);
    }
    postAddFranchise(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getAddFranchiseUrl, dataObj, options);
    }
    postEditFranchise(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getEditFranchiseUrl, dataObj, options);
    }
    getDeleteFranchise(orderWindowId): Observable<any> {
        const queryParams = new HttpParams()
            .set('franchiseId', orderWindowId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getDeleteFranchiseUrl, options);
    }

    //franchise Store

    getlistFranchiseStore(): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getlistFranchiseStoreUrl, options);
    }

    getlistFranchiseStoreById(editId): Observable<any> {
        const queryParams = new HttpParams()
            .set('editId', editId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getlistFranchiseStoreUrl, options);
    }
    postAddFranchiseStore(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getAddFranchiseStoreUrl, dataObj, options);
    }
    postEditFranchiseStore(dataObj = {}): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.getEditFranchiseStoreUrl, dataObj, options);
    }
    getDeleteFranchiseStore(franchiseStoreId): Observable<any> {
        const queryParams = new HttpParams()
            .set('franchiseStoreId', franchiseStoreId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getDeleteFranchiseStoreUrl, options);
    }

    importExcelData(formData, fileType: string): Observable<any> {

        const queryParams = new HttpParams()
            .set('fileType', fileType);
        let forms = 1;
        const options = this.appConfig.generateOption(queryParams, forms);

        //console.log("options->",options);

        return this.http.post(this.importExcelUrl, formData, options);
    }

    importSuggestedData(formData): Observable<any> {

        const queryParams = {};
        let forms = 1;
        const options = this.appConfig.generateOption(queryParams, forms);

        //console.log("options->",options);

        return this.http.post(this.importSuggestedArticleUrl, formData, options);
    }

    importConsolidateOrder(formData): Observable<any> {
        const queryParams = {};
        let forms = 1;
        const options = this.appConfig.generateOption(queryParams, forms);
        return this.http.post(this.importConsolidateUrl, formData, options);
    }

    importOrdersheet(formData): Observable<any> {
        const queryParams = {};
        let forms = 1;
        const options = this.appConfig.generateOption(queryParams, forms);
        return this.http.post(this.importOrdersheetUrl, formData, options);
    }

    importFranchaiseData(formData): Observable<any> {
        const queryParams = {};
        let forms = 1;
        const options = this.appConfig.generateOption(queryParams, forms);
        return this.http.post(this.importFranchaiseUrl, formData, options);
    }

    exportOrders(fileType, seasonId, orderWindowId, brandId, countryId, franchise_name, franchise_code, suggested_article, franchiseId, sheetName): Observable<any> {
        const queryParams = new HttpParams()
            .set('fileType', fileType)
            .set('seasonId', seasonId)
            .set('orderWindowId', orderWindowId)
            .set('brandId', brandId)
            .set('countryId', countryId)
            .set('franchiseName', franchise_name)
            .set('franchiseCode', franchise_code)
            .set('suggested_article', suggested_article)
            .set('franchiseId', franchiseId)
            .set('sheetName', sheetName)
        const token = localStorage.getItem('mean-token');
        this.headers = this.headers.set('Authorization', token);
        const options = {
            params: queryParams,
            headers: this.headers,
            responseType: 'blob' as 'blob'
        };

        return this.http.get(this.exportMasterUrl, options);
    }

    downloadFileLog(fileId): Observable<any> {
        const queryParams = new HttpParams()
            .set('id', fileId)

        const token = localStorage.getItem('mean-token');
        this.headers = this.headers.set('Authorization', token);
        const options = {
            params: queryParams,
            headers: this.headers,
            responseType: 'blob' as 'blob'
        };

        return this.http.get(this.downloadFilelogUrl, options);
    }

    getlistFilelogs(infoObj: Object): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.listFileLogsUrl, infoObj, options);
    }


    getOrderWindowSeasonList(onlyActive, franchiseId?: any): Observable<any> {
        const queryParams = new HttpParams()
            .set('onlyActive', onlyActive)
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getOrderWindowSeasonListUrl, options);
    }


    getOrderWindowSeasonList2(onlyActive, franchiseId,season=0): Observable<any> {
        const queryParams = new HttpParams()
            .set('onlyActive', onlyActive)
            .set('franchiseId', franchiseId)
            .set('season_id',season.toString());
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getOrderWindowSeasonListUrl2, options);
    }
    getBrandListByFranchiseId(franchiseId, type): Observable<any> {
        const queryParams = new HttpParams()
            .set('franchiseId', franchiseId)
            .set('type', type);

        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getBrandListByFranchiseIdUrl, options);
    }
    checkStoreHasAlreadyThisBrand(franchiseId, brandId, storeId): Observable<any> {
        const queryParams = new HttpParams()
            .set('franchiseId', franchiseId)
            .set('brandId', brandId)
            .set('storeId', storeId);

        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.checkStoreHasAlreadyThisBrandUrl, options);
    }

    getDivisionListSeasonOwWise(seasonId, orderWindowId): Observable<any> {
        const queryParams = new HttpParams()
            .set('seasonId', seasonId)
            .set('orderWindowId', orderWindowId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getDivisionListSeasonOwWiseUrl, options);
    }

    getGenderListSeasonOwWise(seasonId, orderWindowId, divisionId): Observable<any> {
        const queryParams = new HttpParams()
            .set('seasonId', seasonId)
            .set('orderWindowId', orderWindowId)
            .set('divisionId', divisionId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getGenderListSeasonOwWiseUrl, options);
    }

    getCategory1ListSeasonOwWise(seasonId, orderWindowId, divisionId, genderId): Observable<any> {
        const queryParams = new HttpParams()
            .set('seasonId', seasonId)
            .set('orderWindowId', orderWindowId)
            .set('divisionId', divisionId)
            .set('genderId', genderId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getCategory1ListSeasonOwWiseUrl, options);
    }

    getCategory4ListSeasonOwWise(seasonId, orderWindowId, divisionId, genderId, category1Id): Observable<any> {
        const queryParams = new HttpParams()
            .set('seasonId', seasonId)
            .set('orderWindowId', orderWindowId)
            .set('divisionId', divisionId)
            .set('genderId', genderId)
            .set('category1Id', category1Id);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getCategory4ListSeasonOwWiseUrl, options);
    }

    getArticleListSeasonOwWise(seasonId, orderWindowId, divisionId, genderId, category1Id, category4Id): Observable<any> {
        const queryParams = new HttpParams()
            .set('seasonId', seasonId)
            .set('orderWindowId', orderWindowId)
            .set('divisionId', divisionId)
            .set('genderId', genderId)
            .set('category1Id', category1Id)
            .set('category4Id', category4Id);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getArticleListSeasonOwWiseUrl, options);
    }

    getArticleDetails(articleId, sid, owid) {
        const queryParams = new HttpParams()
            .set('articleId', articleId)
            .set('seasonId', sid)
            .set('oederWindowId', owid)
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getArticleDetailUrl, options);
    }

    getSizeInformation(size, articleId, seasonId, orderWindowId) {
        const queryParams = new HttpParams()
            .set('size', size)
            .set('articleId', articleId)
            .set('seasonId', seasonId)
            .set('orderWindowId', orderWindowId);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getInfoSizeUrl, options);
    }

    deleteArticleSize(sizeObj) {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.post(this.deleteSizeUrl, sizeObj, options);
    }

    importArticleImages(formData): Observable<any> {
        const queryParams = {};
        let forms = 1;
        const options = this.appConfig.generateOption(queryParams, forms);
        return this.http.post(this.articlesImageUploadUrl, formData, options);
    }

    getSalesPerson(): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.salesPersonUrl, options);
    }
    getSubsidiaries(): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.subsidiaryUrl, options);
    }

    getmailCusTpe(): Observable<any> {
        const queryParams = {};
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.mailsendCustypeUrl, options);
    }

    getCategory4(season_id: any, table_name: any): Observable<any> {
        const queryParams = new HttpParams()
            .set('season_id', season_id)
            .set('table_name', table_name);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getCategory4Url, options);
    }


    getItemCode(season_id: any, filter: any, table_name: any): Observable<any> {
        const queryParams = new HttpParams()
            .set('season_id', season_id)
            .set('filter', JSON.stringify(filter))
            .set('table_name', table_name);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getItemCodeUrl, options);
    }

    getPackName(season_id: any, category4: any, table_name: any): Observable<any> {
        const queryParams = new HttpParams()
            .set('season_id', season_id)
            .set('category4', category4)
            .set('table_name', table_name);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getPackNameUrl, options);
    }

    getRemarks(season_id: any, category4: any, table_name: any): Observable<any> {
        const queryParams = new HttpParams()
            .set('season_id', season_id)
            .set('category4', category4)
            .set('table_name', table_name);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getRemarksUrl, options);
    }

    getOgLaunchMonth(season_id: any, category4: any, table_name: any): Observable<any> {
        const queryParams = new HttpParams()
            .set('season_id', season_id)
            .set('category4', category4)
            .set('table_name', table_name);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getOgLaunchMonthUrl, options);
    }


    importOrdersheetNew(formData): Observable<any> {
        const queryParams = {};
        let forms = 1;
        const options = this.appConfig.generateOption(queryParams, forms);
        return this.http.post(this.importOrdersheetNewUrl, formData, options);
    }

    getItemName(season_id: any, category4: any, table_name: any): Observable<any> {
        const queryParams = new HttpParams()
            .set('season_id', season_id)
            .set('category4', category4)
            .set('table_name', table_name);
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getItemNameUrl, options);
    }

    getExportMappedDetails(seasonName: string, season_id: any, order_window_id: any, type: any): Observable<any> {
        const queryParams = new HttpParams()
            .set('seasonName', seasonName)
            .set('seasonId', season_id)
            .set('orderWindowId', order_window_id)
            .set('type', type)
        const token = localStorage.getItem('mean-token');
        this.headers = this.headers.set('Authorization', token);
        // const options = this.appConfig.generateOption(queryParams);
        const options = {
            params: queryParams,
            headers: this.headers,
            responseType: 'blob' as 'blob'
        };

        return this.http.get(this.exportMappedDetails, options);
    }

    getCustomerChannels(): Observable<any> {
        const queryParams = new HttpParams();
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getCustomerChannelsUrl, options);
    }


    getStoreTypes(): Observable<any> {
        const queryParams = new HttpParams();
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getStoreTypesUrl, options);
    }

    getExchangeRates(season_id?:string,exchange_rate_id?:string): Observable<any> {
        let queryParams = new HttpParams();
        queryParams=season_id?queryParams.set('season_id',season_id):queryParams;
        queryParams=exchange_rate_id?queryParams.set('exchange_rate_id',exchange_rate_id):queryParams;
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.getExchangeRatesUrl, options);
    }

    updateExchangeRates(exchangeRates:any): Observable<any> {
        const queryParams = new HttpParams();
        const options = this.appConfig.generateOption(queryParams);
        return this.http.put(this.updateExchangeRatesUrl, exchangeRates,options);
    }

    orderWindowLabel(season_id?:string): Observable<any> {
        let queryParams = new HttpParams();
        queryParams=season_id?queryParams.set('season_id',season_id):queryParams;
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.orderWindowLabelUrl, options);
    }
    

    orderWindowList(season_id?:string,order_window_label?:string): Observable<any> {
        let queryParams = new HttpParams();
        queryParams=season_id?queryParams.set('season_id',season_id):queryParams;
        queryParams=order_window_label?queryParams.set('order_window_label',order_window_label):queryParams;
        const options = this.appConfig.generateOption(queryParams);
        return this.http.get(this.orderWindowListUrl, options);
    }

}
