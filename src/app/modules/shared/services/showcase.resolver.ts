import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {IShowcaseItem} from '../../../types';
import {CartService} from './cart.service';

@Injectable({providedIn: 'root'})
export class ShowcaseResolver implements Resolve<Observable<any>> {
  constructor(
    private api: ApiService,
    private cart: CartService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<IShowcaseItem> {
    return this.api.getShowCaseList().pipe(map(data => {
      const item: IShowcaseItem = data[0];
      this.cart.setterPrices = item.prices;

      return item;
    }));
  }
}
