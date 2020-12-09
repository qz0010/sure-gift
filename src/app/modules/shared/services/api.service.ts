import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IShowcaseFundraising, IShowcaseItem} from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseApi = 'api/gift/v2/partner';

  constructor(
    private http: HttpClient
  ) {}

  public getShowCaseList(): Observable<IShowcaseItem[]> {
    return this.http.get<IShowcaseItem[]>(`/${this.baseApi}/showcase/list`);
  }

  public getShowCaseFundraising(uuid: string): Observable<IShowcaseFundraising> {
    return this.http.get<IShowcaseFundraising>(`/${this.baseApi}/showcase/list/${uuid}/fundraising_results`);
  }
}
