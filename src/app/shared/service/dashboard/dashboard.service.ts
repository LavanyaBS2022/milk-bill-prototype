import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppConfigService } from '../../../shared/service/common/app-config.service';
import { store } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public getTotalOrderAmountUrl;
  public getCategory1WiseTotalOrderUrl;
  public getOrdersbyFranchiseeTypeUrl;
  public getOrdersbyGenderUrl;
  public getOrdersbyCountryUrl;
  public getOrdersbyTop5MoqArticleUrl;
  public getOrdersbyTop5GenderUrl;
  public getSeasonalOrdersUrl;
  public getGenderDivisionwiseOrderUrl;
  public getAadminOrdersbycountryUrl;
  private getSeasonalOrdersCurrentSeasonUrl;

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public getBrandLoginSeasonListUrl;

  constructor(private http: HttpClient, private router: Router, private readonly appConfig: AppConfigService) {
    this.getTotalOrderAmountUrl = this.appConfig.generateApiUrl('dashboard.getTotalOrderAmount');
    this.getCategory1WiseTotalOrderUrl = this.appConfig.generateApiUrl('dashboard.getCategory1WiseTotalOrder');
    this.getOrdersbyFranchiseeTypeUrl = this.appConfig.generateApiUrl('dashboard.getOrdersbyFranchiseeType');
    this.getOrdersbyGenderUrl = this.appConfig.generateApiUrl('dashboard.getOrdersbyGender');
    this.getOrdersbyCountryUrl = this.appConfig.generateApiUrl('dashboard.getOrdersbyCountry');
    this.getOrdersbyTop5MoqArticleUrl = this.appConfig.generateApiUrl('dashboard.getOrdersbyTop5MoqArticle');
    this.getOrdersbyTop5GenderUrl = this.appConfig.generateApiUrl('dashboard.getOrdersbyTop5Gender');

    this.getBrandLoginSeasonListUrl = this.appConfig.generateApiUrl('masters.listSeason');

    this.getSeasonalOrdersUrl = this.appConfig.generateApiUrl('dashboard.getSeasonalOrders');
    this.getGenderDivisionwiseOrderUrl = this.appConfig.generateApiUrl('dashboard.getGenderDivisionwiseOrder');
    this.getAadminOrdersbycountryUrl = this.appConfig.generateApiUrl('dashboard.getadminOrdersbycountry');
    this.getSeasonalOrdersCurrentSeasonUrl=this.appConfig.generateApiUrl('dashboard.getSeasonalOrdersCurrentSeason');
    

  }

  getTotalOrderAmount(seasonId, orderWindowId, brandId, franchiseId,roleId,userId,subsidiary_id,store_type): Observable<any> {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId)
      .set('orderWindowId', orderWindowId)
      .set('brandId', brandId)
      .set('franchiseId', franchiseId)
      .set('roleId', roleId)
      .set('userId', userId)
      .set('subsidiary_id',subsidiary_id)
      .set('store_type',store_type);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getTotalOrderAmountUrl, options);
  }

  getCategory1WiseTotalOrder(seasonId, orderWindowId, brandId, franchiseId,roleId,userId,store_type): Observable<any> {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId)
      .set('orderWindowId', orderWindowId)
      .set('brandId', brandId)
      .set('franchiseId', franchiseId)
      .set('roleId', roleId)
      .set('userId', userId)
      .set('store_type',store_type);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getCategory1WiseTotalOrderUrl, options);
  }

  getOrdersbyFranchiseeType(seasonId, orderWindowId, brandId, franchiseId,roleId,userId,store_type): Observable<any> {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId)
      .set('orderWindowId', orderWindowId)
      .set('brandId', brandId)
      .set('franchiseId', franchiseId)
      .set('roleId', roleId)
      .set('userId', userId)
      .set('store_type',store_type);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getOrdersbyFranchiseeTypeUrl, options);
  }

  getOrdersbyGender(seasonId, orderWindowId, brandId, franchiseId,roleId,userId,store_type): Observable<any> {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId)
      .set('orderWindowId', orderWindowId)
      .set('brandId', brandId)
      .set('franchiseId', franchiseId)
      .set('roleId', roleId)
      .set('userId', userId)
      .set('store_type',store_type);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getOrdersbyGenderUrl, options);
  }

  getOrdersbyCountry(seasonId, orderWindowId, brandId, franchiseId,roleId,userId,store_type): Observable<any> {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId)
      .set('orderWindowId', orderWindowId)
      .set('brandId', brandId)
      .set('franchiseId', franchiseId)
      .set('roleId', roleId)
      .set('userId', userId)
      .set('store_type',store_type);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getOrdersbyCountryUrl, options);
  }

  getOrdersByTop5MoqArticle(seasonId, orderWindowId, brandId, franchiseId,roleId,userId): Observable<any> {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId)
      .set('orderWindowId', orderWindowId)
      .set('brandId', brandId)
      .set('franchiseId', franchiseId)
      .set('roleId', roleId)
      .set('userId', userId);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getOrdersbyTop5MoqArticleUrl, options);
  }

  getOrdersbyTop5Gender(seasonId, orderWindowId, brandId, franchiseId,roleId,userId,subsidiary_id,countryList,channel_id,store_type): Observable<any> {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId)
      .set('orderWindowId', orderWindowId)
      .set('brandId', brandId)
      .set('franchiseId', franchiseId)
      .set('roleId', roleId)
      .set('userId', userId)
      .set('subsidiary_id',subsidiary_id)
      .set('countryList',countryList)
      .set('channel_id',channel_id)
      .set('store_type',store_type);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getOrdersbyTop5GenderUrl, options);
  }

  getBrandLoginSeasonList(): Observable<any> {
    const queryParams = {};
    this.headers = this.headers.set('Authorization', '');
    const options = {
      params: queryParams,
      headers: this.headers
    }
    return this.http.get(this.getBrandLoginSeasonListUrl, options);
  }

  getSeasonalOrders(seasonId,orderWindowId, brandId, franchiseId,roleId,userId,prevSeasonId): Observable<any> {
    const queryParams = new HttpParams()
    .set('seasonId', seasonId)
    .set('orderWindowId', orderWindowId)
    .set('brandId', brandId)
    .set('franchiseId', franchiseId)
    .set('roleId', roleId)
    .set('userId', userId)
    .set('prevSeasonId',prevSeasonId);
  const options = this.appConfig.generateOption(queryParams);
  return this.http.get(this.getSeasonalOrdersUrl, options);
  }

  getGenderDivisionwiseOrder(seasonId,orderWindowId, brandId, franchiseId,roleId,userId,prevSeasonId,store_type): Observable<any> {
    const queryParams = new HttpParams()
    .set('seasonId', seasonId)
    .set('orderWindowId', orderWindowId)
    .set('brandId', brandId)
    .set('franchiseId', franchiseId)
    .set('roleId', roleId)
    .set('userId', userId)
    .set('prevSeasonId',prevSeasonId)
    .set('store_type',store_type)
  const options = this.appConfig.generateOption(queryParams);
  return this.http.get(this.getGenderDivisionwiseOrderUrl, options);
  }

  getadminOrdersBycountry(seasonId,prevSeasonId,roleId,userId,subsidiary_id,countryList,channel_id,store_type): Observable<any> {
    const queryParams = new HttpParams()
    .set('seasonId', seasonId)
    .set('prevSeasonId',prevSeasonId)
    .set('roleId', roleId)
    .set('userId', userId)
    .set('subsidiary_id',subsidiary_id)
    .set('countryList',countryList)
    .set('channel_id',channel_id)
    .set('store_type',store_type)

  const options = this.appConfig.generateOption(queryParams);
  return this.http.get(this.getAadminOrdersbycountryUrl, options);
  }

  getSeasonalOrdersCurrentSeason(seasonId,orderWindowId, brandId, franchiseId,roleId,userId,store_type): Observable<any> {
    const queryParams = new HttpParams()
    .set('seasonId', seasonId)
    .set('orderWindowId', orderWindowId)
    .set('brandId', brandId)
    .set('franchiseId', franchiseId)
    .set('roleId', roleId)
    .set('userId', userId)
    .set('store_type',store_type)
  const options = this.appConfig.generateOption(queryParams);
  return this.http.get(this.getSeasonalOrdersCurrentSeasonUrl, options);
  }

}
