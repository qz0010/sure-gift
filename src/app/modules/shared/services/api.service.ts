import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IShowcaseFundraising, IShowcaseItem} from '../../../types';
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
}
