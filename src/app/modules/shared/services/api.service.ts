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
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseApi = 'api/gift/v2/partner';
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private translate: TranslateService
  ) {}

  public getShowCaseList(lang?: string): Observable<IShowcaseItem[]> {
    //?lang=${lang}
    return this.http.get<IShowcaseItem[]>(`${this.apiUrl}/${this.baseApi}/showcase/list?lang=${this.translate.currentLang}`);
  }

  public getShowCaseFundraising(uuid: string, lang?: string): Observable<IShowcaseFundraising> {
    return this.http.get<IShowcaseFundraising>(`${this.apiUrl}/${this.baseApi}/showcase/list/${uuid}/fundraising_results?lang=${this.translate.currentLang}`);
  }

  public getPaymentMethods(lang?: string): Observable<IPaymentMethod[]> {
    return this.http.get<IPaymentMethod[]>(`/${this.baseApi}/showcase/payment_method?lang=${this.translate.currentLang}`);
  }

  public newOrder(data: ICertificateBody, lang?: string): Observable<ICertificateRes> {
    return this.http.put<ICertificateRes>(`/${this.baseApi}/showcase/cart?lang=${this.translate.currentLang}`, JSON.stringify(data));
  }

  public showcaseOrder(uuid: string): Observable<IShowcaseOrder> {
    //    return this.http.get<IShowcaseOrder>(`/api/gift/v2/showcase/order/${uuid}`);
    return this.http.get<IShowcaseOrder>(`/${this.baseApi}/showcase/order/${uuid}?lang=${this.translate.currentLang}`);
  }

  public validateMerchant(payment_method_uuid, data): Observable<any> {
    return this.http.post(`/${this.baseApi}/showcase/payment_method/${payment_method_uuid}/merchant_validation?lang=${this.translate.currentLang}`, data);
  }

  public getSettings(): Observable<ISettings> {
    return this.http.get<ISettings>(`/${this.baseApi}/showcase/settings?lang=${this.translate.currentLang}`);
  }

  public getOffer(): Observable<any> {
    return this.http.get<any>(`/${this.baseApi}/showcase/offer?lang=${this.translate.currentLang} `);
  }
}
