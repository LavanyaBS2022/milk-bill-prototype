import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppConfigService } from '../../../../shared/service/common/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class TargetService {

  private getDivisionUrl: string;
  private getAllGenderUrl: string;
  private getDivisionWiseGenderUrl: string;
  private getAllBusinessUnitUrl: string;
  private getAllProductTypeUrl: string;
  private divisionDetailUrl: string;
  private getTragetDetailsUrl: string;
  private saveOrederDetailUrl: string;
  private getOrderUrl: string;
  private saveOrderAllocationUrl: string;
  private getTragetDetailsEditUrl: string;
  private updateOrderAllocationUrl: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private readonly appConfig: AppConfigService,
  ) {
    this.getDivisionUrl = this.appConfig.generateApiUrl('orders.getDivision');
    this.getAllGenderUrl = this.appConfig.generateApiUrl('orders.getAllGender');
    this.getDivisionWiseGenderUrl = this.appConfig.generateApiUrl('orders.getDivisionWiseGender');
    this.getAllBusinessUnitUrl = this.appConfig.generateApiUrl('orders.getAllBusinessUnit');
    this.getAllProductTypeUrl = this.appConfig.generateApiUrl('orders.getAllProductType');
    this.divisionDetailUrl = this.appConfig.generateApiUrl('orders.divisionwiseDeatail');
    this.getTragetDetailsUrl = this.appConfig.generateApiUrl('orders.getTragetDetails');
    this.saveOrederDetailUrl = this.appConfig.generateApiUrl('orders.saveOrederDetail');
    this.getOrderUrl = this.appConfig.generateApiUrl('orders.getOrder');
    this.saveOrderAllocationUrl = this.appConfig.generateApiUrl('orders.saveOrderAllocation');
    this.getTragetDetailsEditUrl = this.appConfig.generateApiUrl('orders.getTragetDetailsEdit');
    this.updateOrderAllocationUrl = this.appConfig.generateApiUrl('orders.updateOrderAllocation');

  }

  getDivision(): Observable<any> {
    const queryParams = {};
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getDivisionUrl, options);
  }

  getAllGender(): Observable<any> {
    const queryParams = {};
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getAllGenderUrl, options);
  }

  getAllBusinessUnit(): Observable<any> {
    const queryParams = {};
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getAllBusinessUnitUrl, options);
  }

  getAllProductType(): Observable<any> {
    const queryParams = {};
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getAllProductTypeUrl, options);
  }

  getDivisionWiseGender(seasonId: any): Observable<any> {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getDivisionWiseGenderUrl, options);
  }

  getDivisionDeatail(): Observable<any> {
    const queryParams = {};
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.divisionDetailUrl, options);
  }

  getTragetDetails(seasonId: any, orderWindowId: any, brandId: any, franchiseTyepeId: any): Observable<any> {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId)
      .set('orderWindowId', orderWindowId)
      .set('brandId', brandId)
      .set('franchiseTyepeId', franchiseTyepeId);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getTragetDetailsUrl, options);
  }

  getOrderAlocations(orderNo: any): Observable<any> {
    const queryParams = new HttpParams()
      .set('orderNo', orderNo)
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getTragetDetailsEditUrl, options);
  }

  saveOreder(orderData: object) {
    const queryParams = new HttpParams();
    const options = this.appConfig.generateOption(queryParams);
    return this.http.post(this.saveOrederDetailUrl, orderData, options);
  }

  getOrder(seasonId, orderWindowId, franchiseId, storeId, brandId) {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId)
      .set('orderWindowId', orderWindowId)
      .set('franchiseId', franchiseId)
      .set('storeId', storeId)
      .set('brandId', brandId);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getOrderUrl, options);
  }

  saveOrderAllocation(allocatonData: any, type: any) {
    const queryParams = new HttpParams();
    const options = this.appConfig.generateOption(queryParams);
    if (type === 2) {
      return this.http.post(this.updateOrderAllocationUrl, allocatonData, options);
    } else {
      return this.http.post(this.saveOrderAllocationUrl, allocatonData, options);
    }
  }
}
