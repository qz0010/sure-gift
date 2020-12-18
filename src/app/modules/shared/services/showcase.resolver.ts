import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {IShowcaseItem} from '../../../types';
import {CartService} from './cart.service';
import {GlobalResolveDataService} from './global-resolve-data.service';

@Injectable({providedIn: 'root'})
export class ShowcaseResolver implements Resolve<Observable<any>> {
  constructor(
    private api: ApiService,
    private cart: CartService,
    private globalResolveData: GlobalResolveDataService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<IShowcaseItem> {
    return this.api.getShowCaseList(route.params.lang).pipe(map(data => {
      const item: IShowcaseItem = data[0];
      this.cart.setterPrices = item.prices;
      this.cart.setterEvent = (item.meta?.fundraising?.events || [])[0];
      this.globalResolveData.setterEvent = (item.meta?.fundraising?.events || [])[0];
      this.globalResolveData.setterShowcase = item;

      return item;
    }));
  }
}
