import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  ICertificateBody,
  ICertificateRes,
  IPaymentMethod,
  ISettings,
  IShowcaseFundraising,
  IShowcaseItem,
  IShowcaseOrder
} from '../../../types';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseApi = 'api/gift/v2/partner';
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  public getShowCaseList(): Observable<IShowcaseItem[]> {
    return this.http.get<IShowcaseItem[]>(`${this.apiUrl}/${this.baseApi}/showcase/list`);
  }

  public getShowCaseFundraising(uuid: string): Observable<IShowcaseFundraising> {
    return this.http.get<IShowcaseFundraising>(`${this.apiUrl}/${this.baseApi}/showcase/list/${uuid}/fundraising_results`);
  }

  public getPaymentMethods(): Observable<IPaymentMethod[]> {
    return this.http.get<IPaymentMethod[]>(`/${this.baseApi}/showcase/payment_method`);
  }

  public newOrder(data: ICertificateBody): Observable<ICertificateRes> {
    return this.http.put<ICertificateRes>(`/${this.baseApi}/showcase/cart`, JSON.stringify(data));
  }

  public showcaseOrder(uuid: string): Observable<IShowcaseOrder> {
    //    return this.http.get<IShowcaseOrder>(`/api/gift/v2/showcase/order/${uuid}`);
    return this.http.get<IShowcaseOrder>(`/${this.baseApi}/showcase/order/${uuid}`);
  }

  public validateMerchant(payment_method_uuid, data): Observable<any> {
    return this.http.post(`/${this.baseApi}/showcase/payment_method/${payment_method_uuid}/merchant_validation`, data);
  }

  public getSettings(): Observable<ISettings> {
    return this.http.get<ISettings>(`/${this.baseApi}/showcase/settings`);
  }
}
