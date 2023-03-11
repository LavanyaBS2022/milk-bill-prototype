import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppConfigService } from '../../../shared/service/common/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  public getBrandAnalysisUrl;
  public getOrderSummaryUrl;
  public getOrderAnalysisUrl;
  public getActivityReportExcelUrl;
  public getMonthlyWiseReportUrl;
  public getActivityReportUrl;
  public getExcelReportUrl;
  public getExcelReportParamsUrl;
  public getReportFilterMasterDataUrl;
  public getCategory1AnalysisUrl;
  public getCategory4AnalysisUrl;
  public getGenderAnalysisUrl;
  public getSiloAnalysisUrl;
  public getOrderCategoryUrl;
  public getOrderCategoryExcelUrl;
  public getOrderLaunchUrl;
  public getOrderLaunchExcelUrl;
  constructor(private http: HttpClient, private router: Router, private readonly appConfig: AppConfigService) {
    this.getBrandAnalysisUrl = this.appConfig.generateApiUrl('reports.getBrandAnalysis');
    this.getOrderSummaryUrl = this.appConfig.generateApiUrl('reports.getOrderSummary');
    this.getOrderAnalysisUrl = appConfig.generateApiUrl("reports.getOrderAnalysis")
    this.getActivityReportExcelUrl = appConfig.generateApiUrl("report.getActivityReport");
    this.getMonthlyWiseReportUrl = appConfig.generateApiUrl("reports.getMonthlyWiseReport");
    this.getActivityReportUrl = appConfig.generateApiUrl("reports.getActivityReport");
    this.getExcelReportUrl = appConfig.generateApiUrl("report.getExcelReports");
    this.getExcelReportParamsUrl = appConfig.generateApiUrl("report.getExcelReportsParams");
    this.getReportFilterMasterDataUrl = appConfig.generateApiUrl("reports.getReportFilterMasterData");

    this.getCategory1AnalysisUrl = appConfig.generateApiUrl("reports.getCategory1Analysis");
    this.getCategory4AnalysisUrl = appConfig.generateApiUrl("reports.getCategory4Analysis");
    this.getGenderAnalysisUrl = appConfig.generateApiUrl("reports.getGenderAnalysis");
    this.getSiloAnalysisUrl = appConfig.generateApiUrl("reports.getSiloAnalysis");
    this.getOrderCategoryUrl = appConfig.generateApiUrl("reports.getOrderByCategory");
    this.getOrderCategoryExcelUrl = appConfig.generateApiUrl("report.getOrderCategoryExcel");
    this.getOrderLaunchUrl = appConfig.generateApiUrl("reports.getOrderLaunch");
    this.getOrderLaunchExcelUrl = appConfig.generateApiUrl("report.getOrderLaunchExcel");
  }

  getBrandAnalysis(seasonId): Observable<any> {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getBrandAnalysisUrl, options);
  }

  getOrderSummary(seasonId, orderWindowId, franchiseId, brandId,roleId,userId,subsidiary_id,country_id,store_type,channel_id): Observable<any> {
    const queryParams = new HttpParams()
      .set("seasonId", seasonId)
      .set('orderWindowId', orderWindowId)
      .set('brandId', brandId)
      .set('franchiseId', franchiseId)
      .set('roleId', roleId)
      .set('userId', userId)
      .set('subsidiary_id',subsidiary_id)
      .set('country_id',country_id)
      .set('store_type',store_type)
      .set('channel_id',channel_id)
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getOrderSummaryUrl, options);
  }

  getOrderAnalysis(seasonId, orderWindowId, franchiseId, brandId,roleId,userId): Observable<any> {
    const queryParams = new HttpParams()
      .set("seasonId", seasonId)
      .set('orderWindowId', orderWindowId)
      .set('brandId', brandId)
      .set('franchiseId', franchiseId)
      .set('roleId', roleId)
      .set('userId', userId)
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getOrderAnalysisUrl, options);
  }

  getActivityReport(seasonId, orderWindowId, franchiseId, brandId,roleId,userId,subsidiary_id,country_id,store_type,channel_id): Observable<any> {
    const queryParams = new HttpParams()
      .set("seasonId", seasonId)
      .set('orderWindowId', orderWindowId)
      .set('brandId', brandId)
      .set('franchiseId', franchiseId)
      .set('roleId', roleId)
      .set('userId', userId)
      .set('subsidiary_id',subsidiary_id)
      .set('country_id',country_id)
      .set('channel_id',channel_id)
      .set('store_type',store_type)
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getActivityReportUrl, options);
  }

  getActivityExcelReport(seasonId, orderWindowId, franchiseId, brandId): Observable<any> {
    const queryParams = new HttpParams()
      .set("seasonId", seasonId)
      .set('orderWindowId', orderWindowId)
      .set('brandId', brandId)
      .set('franchiseId', franchiseId)
    const token = localStorage.getItem('mean-token');
    this.headers = this.headers.set('Authorization', token);
    const options = {
      params: queryParams,
      headers: this.headers,
      responseType: 'blob' as 'blob'
    };
    return this.http.get(this.getActivityReportExcelUrl, options);
  }


  getExcelReport(option?: any, ): Observable<any> {
    const token = localStorage.getItem('mean-token');
    this.headers = this.headers.set('Authorization', token);
    const options = {
      params: option,
      headers: this.headers,
      responseType: 'blob' as 'blob'
    };

    return this.http.get(this.getExcelReportUrl, options);
  }

  getExcelReportParams(option?: any, ): Observable<any> {
    const token = localStorage.getItem('mean-token');
    this.headers = this.headers.set('Authorization', token);
    const options = {
      params: option,
      headers: this.headers,
      responseType: 'blob' as 'blob'
    };

    return this.http.get(this.getExcelReportParamsUrl, options);
  }

  getMonthlyWiseReport(seasonId, franchiseId, brandId,store_type): Observable<any> {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId)
      .set('franchiseId', franchiseId)
      .set('brandId', brandId)
      .set('store_type',store_type)
    const options = this.appConfig.generateOption(queryParams);
    //console.log(options);
    
    return this.http.get(this.getMonthlyWiseReportUrl, options);
  }

  public getReportFilterMasterData(type: string): Observable<any> {
    const queryParams = new HttpParams().set('type', type);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getReportFilterMasterDataUrl, options);
  }

  getCategory1Analysis(seasonId): Observable<any> {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getCategory1AnalysisUrl, options);
  }

  getCategory4Analysis(seasonId): Observable<any> {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getCategory4AnalysisUrl, options);
  }

  getGenderAnalysis(seasonId): Observable<any> {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getGenderAnalysisUrl, options);
  }

  getSiloAnalysis(seasonId): Observable<any> {
    const queryParams = new HttpParams()
      .set('seasonId', seasonId);
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getSiloAnalysisUrl, options);
  }

  getOrderByCategory(seasonId, div_id?: any): Observable<any> {
    const queryParams: any = {};
    queryParams.seasonId = seasonId;
    if (div_id) {
      queryParams.div_id = div_id
    }
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getOrderCategoryUrl, options);
  }


  getOrderByCategoryExcel(seasonId, div_id?: any, div_name?: any): Observable<any> {
    const queryParams: any = {};
    const token = localStorage.getItem('mean-token');
    this.headers = this.headers.set('Authorization', token);
    queryParams.seasonId = seasonId;
    if (div_id) {
      queryParams.div_id = div_id
    }
    if (div_name) {
      queryParams.fileType = div_name;
    }

    const options = {
      params: queryParams,
      headers: this.headers,
      responseType: 'blob' as 'blob'
    };
    // const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getOrderCategoryExcelUrl, options);
  }


  getOrderByLaunch(seasonId): Observable<any> {
    const queryParams: any = {};
    queryParams.seasonId = seasonId;
    const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getOrderLaunchUrl, options);
  }

  getOrderLaunchMonthExcel(seasonId): Observable<any> {
    const queryParams: any = {};
    const token = localStorage.getItem('mean-token');
    this.headers = this.headers.set('Authorization', token);
    queryParams.seasonId = seasonId;
    queryParams.fileType = "order_launch_month";

    const options = {
      params: queryParams,
      headers: this.headers,
      responseType: 'blob' as 'blob'
    };
    // const options = this.appConfig.generateOption(queryParams);
    return this.http.get(this.getOrderLaunchExcelUrl, options);
  }

}
