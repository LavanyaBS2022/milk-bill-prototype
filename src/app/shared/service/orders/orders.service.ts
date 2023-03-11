import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppConfigService } from '../../../shared/service/common/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private getArticleDetailsUrl: string;
  private getArticlePriceRangeDivisionWiseUrl: string;
  private saveOrderArticleUrl: string;
  private copyStoreDataUrl: string;
  private getStoreWiseAllocationUrl: string;

  private checkOrderStatusUrl: string;
  private getFranchiseStoreListUrl: string;
  private getFranchiseStoreListUrlNew: string;
  private getListFranchiseeOrderUrl: string;

  private getOrderReviewDetailUrl: string;
  private getOrderReviewProcessUrl: string;
  private getOrderReviewUrl: string;

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private getBrandAdminExportOrderDetailsUrl: string;
  private getOrderHistoryStatusUrl: string;
  private getSubmitedorderExportUrl: string;
  private discardOrderUrl: string;
  private getSubmitedAllOrderExport: string;
  private importOrderMasterExcelLatest: string;
  private getMappedDetailsUrl: string;
  private deleteMappedDataUrl: string;
  private getMappedCustomerDetailsUrl: string;
  private getSalesPersonDetailsUrl:string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private readonly appConfig: AppConfigService,
  ) {
    this.getArticleDetailsUrl = this.appConfig.generateApiUrl('orders.getArticleDetails');
    this.getArticlePriceRangeDivisionWiseUrl = this.appConfig.generateApiUrl('orders.getArticlePriceRangeDivisionWise');
    this.saveOrderArticleUrl = this.appConfig.generateApiUrl('orders.saveOrderArticle');
    this.copyStoreDataUrl = this.appConfig.generateApiUrl('orders.copyStoreData');
    this.getStoreWiseAllocationUrl = this.appConfig.generateApiUrl('orders.getStoreWiseAllocation');
    this.checkOrderStatusUrl = this.appConfig.generateApiUrl('orders.checkOrderStatus');
    this.getFranchiseStoreListUrl = this.appConfig.generateApiUrl('orders.getFranchiseStoreList');
    this.getFranchiseStoreListUrlNew = this.appConfig.generateApiUrl('orders.getFranchiseStoreListNew');

    this.getListFranchiseeOrderUrl = this.appConfig.generateApiUrl('orders.getListFranchiseeOrder');
    this.getOrderReviewDetailUrl = this.appConfig.generateApiUrl('orders.getOrderReviewDetail');
    this.getOrderReviewProcessUrl = this.appConfig.generateApiUrl('orders.getOrderReviewProcess');

    this.getBrandAdminExportOrderDetailsUrl = this.appConfig.generateApiUrl('orders.getBrandAdminExportOrderDetails');
    this.getOrderReviewUrl = this.appConfig.generateApiUrl('orders.getOrderReview');
    this.getOrderHistoryStatusUrl = this.appConfig.generateApiUrl('orders.getOrderHistoryStatusUrl');
    this.getSubmitedorderExportUrl = this.appConfig.generateApiUrl('orders.getSubmitedorderExport');
    this.getSubmitedAllOrderExport = this.appConfig.generateApiUrl('orders.getSubmitedAllOrderExport');

    this.discardOrderUrl = this.appConfig.generateApiUrl('orders.discardOrder');

    this.importOrderMasterExcelLatest = this.appConfig.generateApiUrl('orders.importOrderMasterExcelLatest');

    this.getMappedDetailsUrl = this.appConfig.generateApiUrl('orders.getMappedDetailsUrl');
    this.deleteMappedDataUrl = this.appConfig.generateApiUrl('orders.deleteMappedDataUrl');
    this.getMappedCustomerDetailsUrl = this.appConfig.generateApiUrl('orders.getMappedCustomerDetailsUrl');
    this.getSalesPersonDetailsUrl= this.appConfig.generateApiUrl('orders.getSalesPersonDetailsUrl');
  }

  //  postAddFranchise(dataObj = {}): Observable<any> {

  getArticleDetails(dataObj = {}): Observable<any> {
    const queryParams = new HttpParams()

      .set('seasonId', dataObj['season_id'])
      .set('order_id', dataObj['order_id'])
      .set('orderWindowId', dataObj['order_window_id'])
      .set('storeId', dataObj['store_id'])
      .set('brandId', dataObj['brand_id'])
      .set('accessPriority', dataObj['accessPriority'])
      .set('countryId', dataObj['countryId'])
      .set('franchiseId', dataObj['franchiseId'])
      .set('ratio', dataObj['ratio']);


    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getArticleDetailsUrl, options);
  }
  getArticlePriceRangeDivisionWise(): Observable<any> {
    const queryParams = new HttpParams();
    // .set('divisionId', divisionId);

    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getArticlePriceRangeDivisionWiseUrl, options);
  }
  saveOrderArticle(orderedArticles: any, type: any) {
    const queryParams = new HttpParams();
    const options = this.appConfig.generateOption(queryParams);
    return this.http.post(this.saveOrderArticleUrl, orderedArticles, options);

    // if (type === 2) {
    //   return this.http.post(this.updateOrderAllocationUrl,allocatonData, options);
    // } else {
    //   return this.http.post(this.saveOrderAllocationUrl,allocatonData, options);
    // }
  }
  copyStoreData(dataObj: any) {
    const queryParams = new HttpParams();
    const options = this.appConfig.generateOption(queryParams);
    return this.http.post(this.copyStoreDataUrl, dataObj, options);
  }
  getStoreWiseAllocation(order_id): Observable<any> {
    const queryParams = new HttpParams()
      .set('order_id', order_id);

    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getStoreWiseAllocationUrl, options);
  }

  checkOrderStatus(order_no): Observable<any> {
    const queryParams = new HttpParams()
      .set('order_id', order_no);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.checkOrderStatusUrl, options);
  }

  getFranchiseStoreList(franchiseId, orderWindowId, seasonId, brandId): Observable<any> {
    const queryParams = new HttpParams()
      .set('franchiseId', franchiseId)
      .set('orderWindowId', orderWindowId)
      .set('seasonId', seasonId)
      .set('brandId', brandId);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getFranchiseStoreListUrl, options);
  }



  getListFranchiseeOrder(seasonId: any, orderWindowId: any, roleId, userId,orderWindowLabel?:string): Observable<any> {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId)
      .set('orderWindowId', orderWindowId)
      .set('roleId', roleId)
      .set('userId', userId)
      .set('order_window_label',orderWindowLabel);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getListFranchiseeOrderUrl, options);
  }

  getOrderReviewDetails(orderReviewId): Observable<any> {
    const queryParams = new HttpParams().set('order_review_id', orderReviewId);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getOrderReviewDetailUrl, options);
  }

  postOrderReviewProcess(dataObj = {}): Observable<any> {
    const queryParams = {};
    const options = this.appConfig.generateOption(queryParams);
    console.log(dataObj);
    return this.http.post(this.getOrderReviewProcessUrl, dataObj, options);
  }


  exportOrdersDetailsBrandAdmin(dataObj): Observable<any> {

    const queryParams = new HttpParams()
      .set('fileType', dataObj.mType)
      .set('seasonId', dataObj.seasonId)
      .set('orderWindowId', dataObj.orderWindowId)
      .set('customer', dataObj.customer.some(x => x === 0) ? 0 : dataObj.customer)
      .set('store', dataObj.store.some(x => x === 0) ? 0 : dataObj.store)
      .set('brandId', dataObj.brandId)
      .set('divisionId', dataObj.divisionId)
      .set('genderId', dataObj.genderId)
      .set('sheetName', dataObj.sheetName)
      .set('subsidiary_id', dataObj.subsidiary_id)
      .set('orderWindowLabel',dataObj.orderWindowLabel);
    const token = localStorage.getItem('mean-token');
    this.headers = this.headers.set('Authorization', token);

    const options = {
      params: queryParams,
      headers: this.headers,
      responseType: 'blob' as 'blob'
    };
    return this.http.get(this.getBrandAdminExportOrderDetailsUrl, options);
  }

  getOrderReviewData(seasonId: any, orderWindowId: any, orderId: any, divisionId: any, productTypeId: any, rbuId: any, genderId: any) {

    const queryParams = new HttpParams()
      .set('seasonId', seasonId)
      .set('orderWindowId', orderWindowId)
      .set('orderId', orderId)
      .set('divisionId', divisionId)
      .set('productTypeId', productTypeId)
      .set('rbuId', rbuId)
      .set('genderId', genderId);
    const token = localStorage.getItem('mean-token');
    this.headers = this.headers.set('Authorization', token);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getOrderReviewUrl, options);
  }

  getFranchiseStoreListNew(franchiseId, orderWindowId, seasonId, brandId): Observable<any> {
    const queryParams = new HttpParams()
      .set('franchiseId', franchiseId)
      .set('orderWindowId', orderWindowId)
      .set('seasonId', seasonId)
      .set('brandId', brandId);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getFranchiseStoreListUrlNew, options);
  }


  getOrderHistoryStatus(orderId: any) {
    const queryParams = new HttpParams()
      .set('orderId', orderId)
    const token = localStorage.getItem('mean-token');
    this.headers = this.headers.set('Authorization', token);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getOrderHistoryStatusUrl, options);
  }

  exportSubmitedOrders(dataObj): Observable<any> {
    const queryParams = new HttpParams()
      .set('fileType', dataObj.fileType)
      .set('seasonId', dataObj.seasonId)
      .set('orderWindowId', dataObj.orderWindowId)
      .set('brandId', dataObj.brandId)
      .set('franchiseId', dataObj.franchiseId)
      .set('orderId', dataObj.orderId)
      .set('storeId', dataObj.storeId)
      .set('countryId', dataObj.countryId)

    const token = localStorage.getItem('mean-token');
    this.headers = this.headers.set('Authorization', token);

    const options = {
      params: queryParams,
      headers: this.headers,
      responseType: 'blob' as 'blob'
    };
    return this.http.get(this.getSubmitedorderExportUrl, options);
  }
  exportAllSubmitedOrders(dataObj): Observable<any> {
    const queryParams = new HttpParams()
      .set('fileType', dataObj.fileType)
      .set('seasonId', dataObj.seasonId)
      .set('orderWindowId', dataObj.orderWindowId)
      .set('brandId', dataObj.brandId)
      .set('franchiseId', dataObj.franchiseId)
      .set('orderId', dataObj.orderId)
      .set('storeId', dataObj.storeId)
      .set('countryId', dataObj.countryId)
      .set('sheetName', dataObj.sheetName)
    const token = localStorage.getItem('mean-token');
    this.headers = this.headers.set('Authorization', token);

    const options = {
      params: queryParams,
      headers: this.headers,
      responseType: 'blob' as 'blob'
    };
    return this.http.get(this.getSubmitedAllOrderExport, options);
  }
  discardOrder(dataObj: any) {
    const queryParams = new HttpParams();
    const options = this.appConfig.generateOption(queryParams);
    return this.http.post(this.discardOrderUrl, dataObj, options);
  }


  importOrderMasterUpload(objects: any) {
    const queryParams = new HttpParams();
    const options = this.appConfig.generateOption(queryParams);
    return this.http.post(this.importOrderMasterExcelLatest, objects, options);
  }


  getMappedDetails(table_from: string, season_id: any, order_window_id: any, type: any): Observable<any> {
    const queryParams = new HttpParams()
      .set('table_from', table_from)
      .set('season_id', season_id)
      .set('order_window_id', order_window_id)
      .set('type', type)
    const token = localStorage.getItem('mean-token');
    this.headers = this.headers.set('Authorization', token);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getMappedDetailsUrl, options);
  }


  deleteMappedData(table_from: string, season_id: any, order_window_id: any, type: any, id: any): Observable<any> {
    const queryParams = new HttpParams()
      .set('table_from', table_from)
      .set('season_id', season_id)
      .set('order_window_id', order_window_id)
      .set('type', type)
      .set('id', id);
    const token = localStorage.getItem('mean-token');
    this.headers = this.headers.set('Authorization', token);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.delete(this.deleteMappedDataUrl, options);
  }


  getMappedCustomerDetails(season_id: any, order_window_id: any, type: any): Observable<any> {
    const queryParams = new HttpParams()
      .set('season_id', season_id)
      .set('order_window_id', order_window_id)
      .set('type', type)
    const token = localStorage.getItem('mean-token');
    this.headers = this.headers.set('Authorization', token);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getMappedCustomerDetailsUrl, options);
  }

  getSalesPersonDetails(sales_person_id:string): Observable<any> {
    const queryParams = new HttpParams()
      .set('sales_person_id', sales_person_id);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getSalesPersonDetailsUrl, options);
  }
}
